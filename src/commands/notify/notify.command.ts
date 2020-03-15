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
    public async execute(context: TakashiContext): Promise<any> {
        const { takashi, message, rawArguments } = context

        const topicName = rawArguments.join(' ')
        const targetTopic = await this.service.findOrCreateTopic(
            takashi.topicProviders,
            topicName
        )

        const subscriptionResult = await this.service.subscribe(
            message.author.id,
            targetTopic
        )

        if (subscriptionResult === NotifySubscriptionResult.SUBSCRIBED) {
            const subscribedMessage = context.translate(
                'command.notify.subscribed',
                targetTopic.name
            )

            const unsubscribeGuide = context.translate(
                'command.notify.unsubscribe_guide',
                targetTopic.id
            )

            const embed = new MessageEmbed({
                title: context.translate(
                    'command.notify.subscribed_title',
                    targetTopic.id
                ),
                description: `${subscribedMessage}\n${unsubscribeGuide}`,
                color: [93, 120, 228],
                timestamp: targetTopic.airsAt,
                footer: {
                    text: context.translate(
                        'command.notify.source_provider',
                        targetTopic.provider
                    )
                }
            })

            if (targetTopic.properties.thumbnail) {
                embed.setThumbnail(targetTopic.properties.thumbnail)
            }

            return message.channel.send(embed)
        }

        return message.channel.send(
            subscriptionResult === NotifySubscriptionResult.ALREADY_SUBSCRIBED
                ? context.translate('command.notify.already_subscribed')
                : context.translate('unknown_error')
        )
    }
}
