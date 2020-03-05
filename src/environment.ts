/**
 * The port where the web server will listen in.
 */
export const APP_PORT = process.env.APP_PORT || 3000

/**
 * The Discord authorization token.
 */
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN

/**
 * The connection URL of the MongoDB server.
 */
export const DATABASE_URL =
    process.env.DATABASE_URL || 'mongodb://localhost/takashi_development'
