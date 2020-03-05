import { Takashi } from '../core'
import { Message } from 'discord.js'

/**
 * Takashi's message context.
 */
export class TakashiContext {
    /**
     * The Takashi instance that created this message context.
     */
    public takashi: Takashi

    /**
     * The received message.
     */
    public message: Message

    /**
     * The raw argument array.
     */
    public rawArguments: string[]

    /**
     * Initializes a new message context.
     */
    public constructor(
        takashi: Takashi,
        message: Message,
        rawArguments: string[]
    ) {
        this.takashi = takashi
        this.message = message
        this.rawArguments = rawArguments
    }
}
