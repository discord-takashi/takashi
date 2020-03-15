import dayjs from 'dayjs'

import { Language } from '../core/i18n/language'

const EN_US: Language = {
    name: 'English (United States)',
    code: 'en_US',
    strings: {
        default: (key: string) => `Missing translation for key \`${key}\`.`,
        hello: (to: string) => `Hello, ${to}.`,

        'command.list.title': `Your subscriptions`,
        'command.list.subscriptions_count': (topics: number) =>
            `You're subscribed to **${topics}** notification source(s).`,
        'command.list.unsubscribe_guide': () =>
            `To unsubscribe from a notification source, use \`unsubscribe <id>\`.`,
        'command.list.next_episode': (date: Date) =>
            `Next episode will release ${dayjs(date)
                .locale('en_US')
                .fromNow()}.`

        
    }
}

export default EN_US
