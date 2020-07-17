/**
 * The Discord authorization token.
 */
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN

/**
 * The connection URL of the MongoDB server.
 */
export const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/takashi_development'

/**
 * The time for executing the airing check.
 */
export const AIRING_TIME_CHECK = process.env.AIRING_TIME_CHECK || '15 seconds'
