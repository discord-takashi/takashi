import { LanguageRepository } from '../core'

import scan from '../utils/scan'

/**
 * Loads all language from this directory to a language repository.
 */
function load(languages: LanguageRepository) {
    const filesOfLanguages = scan(__dirname, /.language.(js|ts)$/g)

    for (let fileIndex = 0; fileIndex < filesOfLanguages.length; fileIndex++) {
        const file = filesOfLanguages[fileIndex]
        const language = require(file).default

        languages.add(language)
    }
}

export default { load }
