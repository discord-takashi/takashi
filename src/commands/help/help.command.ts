import { Command, TakashiContext } from '../../core'
import { MessageEmbed } from 'discord.js'

/**
 * The command that displays useful information.
 */
export default class HelpCommand extends Command<any> {
    /**
     * Initializes the `help` command.
     */
    public constructor() {
        super('help', class {})
    }

    /**
     * Displays useful information.
     */
    public async execute(context: TakashiContext) {
        const { takashi, message, rawArguments } = context
        const firstArgument = rawArguments.shift()

        if (!firstArgument) {
            const botDeveloper = await takashi.client.users.fetch('295604371465699329')
            const embed = new MessageEmbed({
                title: context.translate('command.help.title'),
                color: [93, 120, 228],
                fields: [
                    {
                        name: context.translate('command.use', '`help commands`'),
                        value: context.translate('command.help.commands'),
                        inline: true,
                    },
                    {
                        name: context.translate('command.use', '`providers`'),
                        value: context.translate('command.help.providers'),
                        inline: true,
                    },
                    {
                        name: context.translate('command.help.github_repository'),
                        value: 'https://github.com/7wf/takashi',
                    },
                    {
                        name: context.translate('command.help.if_you_are_running_into_problems'),
                        value: context.translate('command.help.contact', botDeveloper.tag),
                    },
                ],
                footer: {
                    icon_url: botDeveloper.avatarURL() || botDeveloper.defaultAvatarURL,
                    text: context.translate('command.help.developer', botDeveloper.tag),
                },
            })

            return message.channel.send(embed)
        } else if (firstArgument === 'commands') {
            const title = context.translate('command.help.commands.title')
            const color: [number, number, number] = [93, 120, 228]
            const embed = new MessageEmbed({ title, color })

            const commands = takashi.commands.all()
            let commandList = ''

            for (const command of commands) {
                commandList += `\n${command.name}`
            }

            embed.setDescription(commandList)

            return message.channel.send(embed)
        }
    }
}
