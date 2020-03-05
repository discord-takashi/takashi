import { DISCORD_TOKEN } from './environment'

import { Takashi } from './core/core'
import error from './utils/error'

import database from './database'

import commands from './commands'
import modules from './modules'

const takashi = new Takashi()

modules.load(takashi)
commands.load(takashi.commands)

database.connect().catch(error('Cannot connect to MongoDB.'))
takashi.start(DISCORD_TOKEN!).catch(error('Cannot connect to Discord API.'))
