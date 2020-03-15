import { Takashi } from '../core'
import { Message } from 'discord.js'
import { UserDocument } from '../../models/user'
import { Language } from '../i18n/language'

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

        this.language = takashi.languages.get(user.language)!
    }

    /**
     * Turns a `string` into a localized message.
     */
    public translate(string: string, ...args: any) {
        const languageString = this.language.strings[string]
        return typeof languageString === 'function'
            ? languageString(...args)
            : languageString
    }
}
