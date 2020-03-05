import mongoose, { ConnectionOptions } from 'mongoose'

import { DATABASE_URL } from './environment'

const CONNECTION_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

/**
 * Connects to the MongoDB server.
 */
function connect() {
    return mongoose.connect(DATABASE_URL, CONNECTION_OPTIONS).then(() => {
        console.log('Successfully connected to MongoDB.')
    })
}

export default { connect }
