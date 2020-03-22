import { MessageEmbed } from 'discord.js'
import Agenda from 'agenda'

import { Takashi } from '../core'

import Topic, { TopicDocument } from '../models/topic'
import { UserDocument } from '../models/user'

/**
 * The name of the job that sends a notification to a user.
 */
export const SEND_NOTIFICATION = 'send notification'

/**
 * The name of the job that finds a topic that already has aired.
 */
export const AIRING_CHECK = 'airing topics'

/**
 * Loads all jobs to a `agenda` instance
 */
export default function loadJobs(takashi: Takashi, agenda: Agenda) {
    /**
     * Sends a notification to a subscriber.
     */
    function notify(topic: TopicDocument, subscriber: UserDocument) {
        return agenda.now(SEND_NOTIFICATION, {
            to: subscriber.id,
            topic
        } as NotificationParamethers)
    }

    /**
     * Searchs for topics that aired at this time.
     */
    agenda.define(AIRING_CHECK, async () => {
        const now = Date.now()
        const topicQuery = { airsAt: { $lt: now } }
        const topic = await Topic.findOne(topicQuery)
            .populate('subscribers')
            .exec()

        if (topic) {
            await topic.subscribers.map(async (subscriber: UserDocument) => {
                await notify(topic, subscriber)
                return subscriber.updateOne({
                    last_notification_received: new Date()
                })
            })

            const topicProvider = takashi.topicProviders.find(topic.provider)!

            if (topicProvider) {
                const updatedTopic = await topicProvider.fetchTopic(topic.name).catch(() => {
                    return { name: null }
                })

                // `fetchTopic` uses searching.
                // conflicts of topics can occour during the update.
                if (updatedTopic.name === topic.name) {
                    const { description, airsAt, properties } = updatedTopic

                    await topic.updateOne({ description, airsAt, properties })
                } else {
                    await topic.remove()
                }
            }
        }
    })

    /**
     * Sends a notification to a user.
     */
    agenda.define(SEND_NOTIFICATION, async job => {
        const { to, topic } = job.attrs.data as NotificationParamethers
        const user = takashi.client.users.resolve(to)

        if (user) {
            const dm = await user.createDM()
            const embed = new MessageEmbed()

            embed.setTitle(topic.name)
            embed.setDescription(topic.description)
            embed.setFooter(`Notification Source from ${topic.provider}`)
            embed.setTimestamp(topic.airsAt)

            if (topic.properties.color) {
                embed.setColor(topic.properties.color)
            } else {
                embed.setColor('rgb(93, 120, 228)') // default color
            }

            if (topic.properties.thumbnail) {
                embed.setThumbnail(topic.properties.thumbnail)
            }

            await dm.send(embed)
        } else {
            job.fail('The provided user does not exists inside Discord.')
        }
    })
}

/**
 * The paramethers for the notification job.
 */
export interface NotificationParamethers {
    to: string
    topic: TopicDocument
}
