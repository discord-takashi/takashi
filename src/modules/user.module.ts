import { Takashi } from '../core'
import { GuildMember, PartialGuildMember } from 'discord.js'
import user from '../models/user'

/**
 * Manages users inside the database.
 */
export default function users(takashi: Takashi) {
    takashi.client.on('guildMemberAdd', async (member: PartialGuildMember | GuildMember) => {
        if (member.user) {
            await user.create({ id: member.user.id })
        }
    })

    takashi.client.on('guildMemberRemove', async (member: PartialGuildMember | GuildMember) => {
        if (member.user) {
            await user.remove({ id: member.user.id })
        }
    })
}
