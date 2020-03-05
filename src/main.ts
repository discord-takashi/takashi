import { DISCORD_TOKEN } from './environment'

import { Takashi } from './core/core'

import commands from './commands'
import modules from './modules'

const takashi = new Takashi()

modules.load(takashi)
commands.load(takashi.commands)

takashi.start(DISCORD_TOKEN!).catch((error: Error) => {
    console.error(`Cannot connect to Discord API.`)
    console.error(`Reason: ${error.message}`)
})
