import { Takashi } from '../core'

import Topic from '../models/topic'

/**
 * Outputs a message when the bot is ready.
 */
export default function ready(takashi: Takashi) {
    async function setupActivity() {
        takashi.client.user!.setActivity({
            type: 'STREAMING',
            url: 'https://twitch.tv/discord_takashi',
            name: `${await Topic.countDocuments()} notification sources for ${
                takashi.client.users.cache.size - 1 // not streaming for himself
            } users`
        })
    }

    takashi.client.once('ready', () => {
        const takashiName = takashi.client.user!.tag
        console.log(`${takashiName} is ready.`)

        setupActivity()
        setInterval(setupActivity, 5 * 60 * 1000)
    })
}
