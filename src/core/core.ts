import { Client, Message } from 'discord.js'

import { TopicProviderRepository } from './topic/topic-provider.repository'
import { CommandRepository, CommandHandler } from './commands'
import { LanguageRepository } from './i18n/language.repository'

/**
 * The Takashi's core.
 */
export class Takashi {
    /**
     * The `discord.js` client.
     */
    public client: Client

    /**
     * The topic provider repository.
     */
    public topicProviders: TopicProviderRepository

    /**
     * The command repository.
     */
    public commands: CommandRepository

    /**
     * Takashi's command handler.
     */
    public commandHandler: CommandHandler

    /**
     * The language repository.
     */
    public languages: LanguageRepository

    /**
     * Initializes a new Takashi instance.
     */
    public constructor() {
        this.topicProviders = new TopicProviderRepository()
        this.commands = new CommandRepository()
        this.languages = new LanguageRepository()

        this.client = new Client({
            partials: ['MESSAGE', 'CHANNEL', 'USER']
        })

        this.commandHandler = new CommandHandler(this, this.commands)
        this.client.on('message', async (message: Message) =>
            this.commandHandler.handle(message)
        )
    }

    /**
     * Starts this instance.
     */
    public start(token: string) {
        return this.client.login(token)
    }
}
