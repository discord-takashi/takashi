import { Command, TakashiContext } from '../../core'

import HelloService from './hello.service'

/**
 * Replies the received message with a `Hello, <user>.`
 */
export default class HelloCommand extends Command<HelloService> {
    /**
     * Initiailizes the `hello` command.
     */
    public constructor() {
        super('hello', HelloService)
    }

    /**
     * Replies the message with `Hello, <user>.`.
     */
    public async execute({ message }: TakashiContext) {
        const response = this.service.hello(`<@${message.author.id}>`)
        return message.channel.send(response)
    }
}
