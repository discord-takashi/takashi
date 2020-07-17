import mongoose from 'mongoose'
import Agenda from 'agenda'

import { DATABASE_URL, AIRING_TIME_CHECK } from './environment'
import { Takashi } from './core'

import loadJobs, { AIRING_CHECK } from './jobs'

/**
 * The `agenda` instance.
 */
export let agenda: Agenda

/**
 * Connects to the MongoDB server.
 */
function connect(takashi: Takashi) {
    return mongoose
        .connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('Successfully connected to MongoDB.'))
        .then(async () => {
            console.log('Initializing the job sheduling service.')

            agenda = new Agenda({ mongo: mongoose.connection.db })
            loadJobs(takashi, agenda)

            await agenda.every(AIRING_TIME_CHECK, AIRING_CHECK)
            await agenda.start()
        })
}

export default { connect }
