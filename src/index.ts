import * as sentry from '@sentry/node'

// Load environment variables from `.env`
require('dotenv/config')

// Sentry Setup
const dsn = process.env.SENTRY_DSN
const environment = process.env.NODE_ENV

if (dsn) sentry.init({ environment, dsn })

// Runs the application
require('./main')
