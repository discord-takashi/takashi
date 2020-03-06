import { DISCORD_TOKEN } from './environment'

import { Takashi } from './core/core'
import error from './utils/error'

import database from './database'

import commands from './commands'
import modules from './modules'

const takashi = new Takashi()

modules.load(takashi)
commands.load(takashi.commands)

// Connect to Discord services.
takashi.start(DISCORD_TOKEN!).catch(error('Cannot connect to Discord API.'))

// The Discord services is used at database for things like
// sending persisted messages from jobs
takashi.client.once('ready', () => {
    database.connect(takashi).catch(error('Cannot connect to MongoDB.'))
})
