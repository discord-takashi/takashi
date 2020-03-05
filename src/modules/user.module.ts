import { Takashi } from '../core'
import { GuildMember } from 'discord.js'
import user from '../models/user'

/**
 * Manages users inside the database.
 */
export default function users(takashi: Takashi) {
    takashi.client.on('guildMemberAdd', async (member: GuildMember) =>
        user.create({ id: member.user.id })
    )

    takashi.client.on('guildMemberRemove', async (member: GuildMember) =>
        user.remove({ id: member.user.id })
    )
}
