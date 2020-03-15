import { Message, MessageEmbed } from 'discord.js'

import User from '../../models/user'

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

        let registeredUser = await User.findOne({ id: message.author.id })
        if (!registeredUser) {
            registeredUser = await User.create({ id: message.author.id })
        }

        const command = this.commandRepository.find(commandName)
        const context = new TakashiContext(
            this.takashi,
            message,
            commandArguments,
            registeredUser
        )

        if (command) {
            return command.execute(context).catch((error: Error) => {
                const errorMessage = '```asciidoc\n* ' + error.message + '\n```'

                const embed = new MessageEmbed({
                    title: 'An error has occourred.',
                    description: errorMessage,
                    color: [235, 59, 59]
                })

                return message.channel.send(embed)
            })
        }
    }
}
