import dayjs from 'dayjs'

import { Language } from '../core/i18n/language'

const EN_US: Language = {
    name: 'English (United States)',
    code: 'en_US',
    strings: {
        default: (key: string) => `Missing translation for key \`${key}\`.`,
        unknown_error: `An unknown error has occurred.`,

        hello: (to: string) => `Hello, ${to}.`,

        'command.list.title': `Your subscriptions`,
        'command.list.subscriptions_count': (topics: number) => `You're subscribed to **${topics}** notification source(s).`,
        'command.list.unsubscribe_guide': () => `To unsubscribe from a notification source, use \`unsubscribe <provider> <id>\`.`,
        'command.list.next_episode': (date: Date) => {
            const dateLocalized = dayjs(date).locale('en_US')

            const releasedIn = dateLocalized.fromNow()
            const releaseTime = dateLocalized.format('HH:mm')

            return `Next episode will release ${releasedIn}. (${releaseTime})` 
        },

        'command.notify.subscribed_title': (id: string) => `Subscribed to #${id}.`,
        'command.notify.subscribed': (name: string) => `You've succesfully subscribed to ${name}.`,
        'command.notify.unsubscribe_guide': (provider: string, id: string) => `To unsubscribe from notifications of this source use \`unsubscribe ${provider} ${id}\`.`,
        'command.notify.already_subscribed': `You're already subscribed to this notification source.`,
        'command.notify.source_provider': (provider: string) => `Notification Source from \`${provider}\``,

        'command.unsubscribed.unsubscribed': (name: string) => `Successfully unsubscribed from "${name}".`,
        'command.unsubscribed.not_subscribed': `You're not subscribed to this notification source.`,
        'command.unsubscribe.not_found': `This notification source cannot be found.`,

        'command.providers.title': 'Notification Providers',
        'command.providers.provided_by': (provider: string) => `Provided by \`${provider}\``
    }
}

export default EN_US
