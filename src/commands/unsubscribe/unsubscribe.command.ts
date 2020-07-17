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
        const { takashi, message, rawArguments } = context

        const providerName = rawArguments.shift()!
        const provider = takashi.topicProviders.findByAlias(providerName)

        if (!provider) {
            throw new Error(`The provider "${providerName}" does not exists.`)
        }

        const topicName = rawArguments.join(' ')
        const targetTopic = await this.service.getTopicById(topicName, provider.name)

        if (targetTopic) {
            const unsubscribed = await this.service.removeSubscriptionFromTopic(message.author.id, targetTopic)

            let response = context.translate('command.unsubscribed.not_subscribed')

            if (unsubscribed) {
                response = context.translate('command.unsubscribed.unsubscribed', targetTopic.name)
            }

            return message.channel.send(response)
        } else {
            return message.channel.send(context.translate('command.unsubscribe.not_found'))
        }
    }
}
