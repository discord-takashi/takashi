import { TopicProviderRepository } from '../../core/topic/topic-provider.repository'
import { CommandService } from '../../core/commands/command-service'

import Topic, { TopicDocument } from '../../models/topic'
import User from '../../models/user'
import { TopicProvider } from '../../core/topic/topic-provider'

/**
 * The result for `NotifyService#subscribe`.
 */
export enum NotifySubscriptionResult {
    SUBSCRIBED,
    ALREADY_SUBSCRIBED,
    UNKNOWN,
}

/**
 * The service for the `notify` command.
 */
export default class NotifyService extends CommandService {
    /**
     * Subscribe to a topic.
     */
    public async subscribe(userId: string, topic: TopicDocument): Promise<NotifySubscriptionResult> {
        const user = await User.findOne({ id: userId })

        if (user) {
            if (!topic.subscribers.includes(user._id)) {
                topic.subscribers.push(user._id)
                await topic.save()
                return NotifySubscriptionResult.SUBSCRIBED
            } else {
                return NotifySubscriptionResult.ALREADY_SUBSCRIBED
            }
        }

        return NotifySubscriptionResult.UNKNOWN
    }

    /**
     * Find or create a new topic.
     */
    public async findOrCreateTopic(topicProvider: TopicProvider, topicName: string): Promise<TopicDocument> {
        const topicData = await topicProvider.fetchTopic(topicName)
        let topic: TopicDocument | null = await Topic.findOne({
            id: topicData.id,
        })

        if (!topic) {
            topic = await Topic.create({
                id: topicData.id,
                name: topicData.name,
                provider: topicData.provider,
                description: topicData.description,
                airsAt: topicData.airsAt,
                properties: {
                    thumbnail: topicData.properties.thumbnail,
                    color: topicData.properties.color,
                },
            } as any)
        }

        return topic
    }
}
