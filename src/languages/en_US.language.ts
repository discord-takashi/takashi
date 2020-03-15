import { Language } from '../core/i18n/language'

const EN_US: Language = {
    name: 'English (United States)',
    code: 'en_US',
    strings: {
        default: (key: string) => `Missing translation for key \`${key}\`.`,
        hello: (to: string) => `Hello, ${to}.`
    }
}

export default EN_US
