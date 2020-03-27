import { Command, TakashiContext } from '../../core'
import { MessageEmbed } from 'discord.js'

/**
 * The command for listing providers.
 */
export default class ProviderListCommand extends Command<{}> {

    /**
     * Initializes the `providers` command.
     */
    public constructor() {
        super('providers', class {})
    }

    /**
     * List all topic providers from Takashi provider repository.
     */
    public async execute(context: TakashiContext): Promise<any> {
        const { takashi, message } = context
        const providers = takashi.topicProviders.all()
        const embed = new MessageEmbed({
            title: context.translate('command.providers.title'),
            color: [93, 120, 228],
        })

        for (const provider of providers) {
            embed.addField(
                provider.alias,
                context.translate('command.providers.provided_by', provider.name)
            )
        }

        return message.channel.send(embed)
    }

}