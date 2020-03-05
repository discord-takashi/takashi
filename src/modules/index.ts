import { Takashi } from '../core'

import scan from '../utils/scan'

/**
 * Attach modules to a Takashi instance.
 */
function load(takashi: Takashi) {
    const filesOfModules = scan(__dirname, /.module.(ts|js)$/)

    for (let fileIndex = 0; fileIndex < filesOfModules.length; fileIndex++) {
        const modulePath = filesOfModules[fileIndex]
        const loadModule = require(modulePath).default

        loadModule(takashi)
    }
}

export default { load }
