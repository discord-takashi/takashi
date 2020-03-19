import { Takashi } from '../core'
import { Message } from 'discord.js'
import { UserDocument } from '../../models/user'
import { Language, translate } from '../i18n'

import EN_US from '../../languages/en_US.language'

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
     * The document of the user.
     */
    public user: UserDocument

    /**
     * The language of the user.
     */
    public language: Language

    /**
     * Initializes a new message context.
     */
    public constructor(
        takashi: Takashi,
        message: Message,
        rawArguments: string[],
        user: UserDocument
    ) {
        this.takashi = takashi
        this.message = message
        this.rawArguments = rawArguments
        this.user = user

        this.language = takashi.languages.get(user.language) || EN_US
    }

    /**
     * Turns a `string` into a localized message.
     */
    public translate(string: string, ...args: any) {
        return translate(this.language, string, ...args)
    }
}
