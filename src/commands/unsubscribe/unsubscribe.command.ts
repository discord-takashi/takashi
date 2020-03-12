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
    public async execute({ message, rawArguments }: TakashiContext): Promise<any> {
        const targetTopic = await this.service.getTopicById(rawArguments.shift()!)

        if(targetTopic) {
            const unsubscribed = await this.service.removeSubscriptionFromTopic(
                message.author.id,
                targetTopic
            )

            return message.channel.send(
                unsubscribed
                    ? `Successfully unsubscribed from "${targetTopic.name}".`
                    : `You're not subscribed to this notification source.`
            )
        } else {
            return message.channel.send(`This notification source cannot be found.`)
        }
    }
}
