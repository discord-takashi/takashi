import { Command, TakashiContext } from '../../core'

import UnsubscribeService from './unsubscribe.service'

/**
 * The command for unsubscribing from topics.
 */
export default class UnsubscribeCommand extends Command<UnsubscribeService> {
    /**
     * Initializes the `unsubscribe` command.
     */
    public constructor() {
        super('unsubscribe', UnsubscribeService)
    }

    /**
     * Unsubscribes from a topic.
     */
    public async execute(context: TakashiContext): Promise<any> {
        const { message, rawArguments } = context
        const targetTopic = await this.service.getTopicById(
            rawArguments.shift()!
        )

        if (targetTopic) {
            const unsubscribed = await this.service.removeSubscriptionFromTopic(
                message.author.id,
                targetTopic
            )

            return message.channel.send(
                !unsubscribed
                    ? context.translate('command.unsubscribed.not_subscribed')
                    : context.translate(
                          'command.unsubscribed.unsubscribed',
                          targetTopic.name
                      )
            )
        } else {
            return message.channel.send(
                context.translate('command.unsubscribe.not_found')
            )
        }
    }
}
