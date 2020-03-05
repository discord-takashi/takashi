import { TakashiContext } from './message-context'
import { CommandService } from './command-service'

/**
 * Represents a user-executable command.
 */
export abstract class Command<Service extends CommandService = any> {
    /**
     * The name of the command.
     */
    public name: string

    /**
     * The command service.
     */
    public service: Service

    /**
     * Initializes a new command.
     */
    public constructor(name: string, service: Class<Service>) {
        this.name = name
        this.service = new service()
    }

    /**
     * Executes this command.
     */
    public abstract async execute(context: TakashiContext): Promise<any>
}

type Class<T> = { new (): T }
