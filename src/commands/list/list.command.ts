import dayjs from 'dayjs'

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
    public async execute({ message }: TakashiContext) {
        const user = await this.service.fetchUser(message.author.id)
        const topics = await this.service.fetchUserTopics(user!._id)
        const userAvatar = message.author.avatarURL()
        const response = new MessageEmbed({
            title: 'Your subscriptions',
            description:
                `You're subscribed to **${topics.length}** notification source(s).\n` +
                `To unsubscribe from a notification source, use \`unsubscribe #id\`.`,
            color: [93, 120, 228] // rgba(93, 120, 228)
        })

        if (userAvatar) {
            response.setThumbnail(userAvatar)
        }

        topics
            .sort((a, b) => a.airsAt - b.airsAt)
            .map((topic: TopicDocument) => {
                response.addField(
                    `${topic.name} (#${topic.id})`,
                    `Next episode will release ${dayjs(topic.airsAt).fromNow()}.`
                )
            })

        return message.channel.send(response)
    }
}
