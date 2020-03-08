import { Command, TakashiContext } from '../../core'

import NotifyService, { NotifySubscriptionResult } from './notify.service'
import { MessageEmbed } from 'discord.js'

/**
 * The command for subscribing to topics.
 */
export default class NotifyCommand extends Command<NotifyService> {
    /**
     * Initializes the `notify` command.
     */
    public constructor() {
        super('notify', NotifyService)
    }

    /**
     * Subscribes to a topic.
     */
    public async execute({
        takashi,
        message,
        rawArguments
    }: TakashiContext): Promise<any> {
        const topicName = rawArguments.join(' ')
        const targetTopic = await this.service.findOrCreateTopic(
            takashi.topicProviders,
            topicName
        )

        const subscriptionResult = await this.service.subscribe(
            message.author.id,
            targetTopic
        )

        let embed = new MessageEmbed()

        if (subscriptionResult === NotifySubscriptionResult.SUBSCRIBED) {
            embed = new MessageEmbed({
                title: `Subscribed to #${targetTopic.id}`,
                description: `You've succesfully subscribed to ${targetTopic.name}.\n\nTo unsubscribe from this notification use \`unsubscribe ${targetTopic.id}\`.`,
                color: [93, 120, 228],
                timestamp: targetTopic.airsAt,
                footer: {
                    text: `Notification Source from \`${targetTopic.provider}\``
                }
            })

            if (targetTopic.properties.thumbnail) {
                embed.setThumbnail(targetTopic.properties.thumbnail)
            }

            return message.channel.send(embed)
        }

        return message.channel.send(
            subscriptionResult === NotifySubscriptionResult.ALREADY_SUBSCRIBED
                ? `You're already subscribed to this notification source.`
                : `A unknown error occoured.`
        )
    }
}
