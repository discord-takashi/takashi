import Topic, { TopicDocument } from "../../models/topic";
import User from "../../models/user";

/**
 * The service for the `unsubscribe` command.
 */
export default class UnsubscribeService {

    /**
     * Finds a topic by the ID.
     */
    public async getTopicById(id: string): Promise<TopicDocument| null> {
        return Topic.findOne({ id })
    }

    /**
     * Removes a user subscription from a topic.
     */
    public async removeSubscriptionFromTopic(userId: string, topic: TopicDocument): Promise<boolean> {
        const user = await User.findOne({ id: userId })

        if (user) {
            if (!topic.subscribers.includes(user._id)) return false

            await topic.updateOne({ $pull: { subscribers: user._id } })
            return true
        }

        return true
    }

}