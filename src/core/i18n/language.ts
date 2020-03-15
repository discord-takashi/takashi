/**
 * Represents a language.
 */
export interface Language {
    /**
     * The code of the language.
     */
    code: string

    /**
     * The localized name of the language.
     */
    name: string

    /**
     * The translation strings.
     */
    strings: {
        default: (key: string) => string
        [key: string]: ((...args: any) => string) | string
    }
}
