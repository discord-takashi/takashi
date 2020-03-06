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
            topic: topic.name
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
            await topic.subscribers.map(subscriber => notify(topic, subscriber))
            await topic.remove() // we will not use this topic anymore
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
            await dm.send(topic)
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
    topic: string
}
