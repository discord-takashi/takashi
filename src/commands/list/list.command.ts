import { Command, TakashiContext } from '../../core'
import { TopicDocument } from '../../models/topic'

import ListService from './list.service'
import { MessageEmbed } from 'discord.js'

/**
 * The command for listing subscriptions.
 */
export default class ListCommand extends Command<ListService> {
    /**
     * Initializes the `list` command.
     */
    public constructor() {
        super('list', ListService)
    }

    /**
     * Displays the subscription list to a user.
     */
    public async execute(context: TakashiContext) {
        const { message } = context

        const user = await this.service.fetchUser(message.author.id)
        const topics = await this.service.fetchUserTopics(user!._id)
        const userAvatar = message.author.avatarURL()

        const subscriptionCount = context.translate(
            'command.list.subscriptions_count',
            topics.length
        )

        const unsubscribeGuide = context.translate(
            'command.list.unsubscribe_guide'
        )

        const response = new MessageEmbed({
            title: context.translate('command.list.title'),
            color: [93, 120, 228], // rgba(93, 120, 228)
            description: `${subscriptionCount}\n${unsubscribeGuide}`
        })

        if (userAvatar) {
            response.setThumbnail(userAvatar)
        }

        topics
            .sort((a: TopicDocument, b: TopicDocument) => a.airsAt - b.airsAt)
            .map((topic: TopicDocument) => {
                response.addField(
                    `${topic.name} (#${topic.id})`,
                    context.translate('command.list.next_episode', topic.airsAt)
                )
            })

        return message.channel.send(response)
    }
}
