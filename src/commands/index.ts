import { CommandRepository } from '../core'

import scan from '../utils/scan'

/**
 * Loads all commands from this directory.
 */
function load(commands: CommandRepository) {
    const filesOfCommands = scan(__dirname, /.command.(js|ts)$/g)

    for (let fileIndex = 0; fileIndex < filesOfCommands.length; fileIndex++) {
        const file = filesOfCommands[fileIndex]
        const InitializableCommand = require(file).default
        const command = new InitializableCommand()

        commands.add(command)
    }
}

export default { load }
