import { Language } from './language'

/**
 * The repository for languages.
 */
export class LanguageRepository {
    /**
     * The registered languages.
     */
    protected languages: Language[]

    /**
     * Initializes the language repository.
     */
    public constructor() {
        this.languages = []
    }

    /**
     * Gets a language by the code.
     */
    public get(code: string) {
        return this.languages.find((language: Language) => language.code === code)
    }

    /**
     * Adds a new language to this repository.
     */
    public add(language: Language) {
        this.languages.push(language)
    }
}
