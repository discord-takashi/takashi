import { CommandService } from '../../core/commands/command-service'

import Topic from '../../models/topic'
import User from '../../models/user'

/**
 * The service for the `list` command.
 */
export default class ListService extends CommandService {

    /**
     * Fetchs a user from the database based on your ID.
     */
    public async fetchUser(id: string) {
        const userId = await User.findOne({ id })

        return userId
    }

    /**
     * Fetchs all topics that a user is subscribed to.
     */
    public async fetchUserTopics(userId: string) {
        const userTopics = await Topic.find({ subscribers: { $in: userId } })

        return userTopics
    }

}