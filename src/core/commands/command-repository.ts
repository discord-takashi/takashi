import { Command } from './command'

/**
 * The repository for commands.
 */
export class CommandRepository {
    /**
     * The array of commands registered inside this repository.
     */
    public commands: Command[]

    /**
     * Initializes a new command repository.
     */
    public constructor() {
        this.commands = []
    }

    /**
     * Adds a command to this repository.
     */
    public add(command: Command): void {
        this.commands.push(command)
    }

    /**
     * Query a specific value.
     */
    public where(key: keyof Command, value: any) {
        return this.commands.filter((command: Command) => {
            return command[key] === value
        })
    }

    /**
     * Finds a command inside this repository.
     */
    public find(name: string): Command | undefined {
        return this.where('name', name).shift()
    }
}
