import { Language } from './language'

export function translate(language: Language, string: string, ...args: any) {
    let languageString = language.strings[string]

    if (!languageString) {
        languageString = language.strings.default
    }

    return typeof languageString === 'function' ? languageString(...args) : languageString
}
