import { Message } from 'discord.js'

import { CommandRepository } from './command-repository'
import { TakashiContext } from './message-context'
import { Takashi } from '../core'

/**
 * Takashi's command handler.
 * Do not get reference for other types of bot.
 */
export class CommandHandler {
    /**
     * Initializes a new command handler.
     */
    public constructor(
        public takashi: Takashi,
        public commandRepository: CommandRepository
    ) {}

    /**
     * Handles a incoming message.
     */
    public async handle(message: Message) {
        if (message.author.bot) return // ignore messages from bots.
        if (message.channel.type !== 'dm') return // the bot only accept messages from DM.

        // Note that Takashi does not looks for prefixes.
        const commandArguments = message.content.split(/\s+/)
        const commandName = commandArguments.shift()!.toLowerCase()

        const command = this.commandRepository.find(commandName)
        const context = new TakashiContext(
            this.takashi,
            message,
            commandArguments
        )

        if (command) {
            return command.execute(context)
        }
    }
}
