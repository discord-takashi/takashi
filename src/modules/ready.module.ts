import { Takashi } from '../core'

/**
 * Outputs a message when the bot is ready.
 */
export default function ready(takashi: Takashi) {
    takashi.client.on('ready', () => {
        const takashiName = takashi.client.user!.tag
        console.log(`${takashiName} is ready.`)
    })
}
