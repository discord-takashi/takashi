import path from 'path'
import fs from 'fs'

/**
 * Search for files with regex name matching.
 */
export default function scan(directory: string, match: RegExp): string[] {
    const files = fs.readdirSync(directory)
    const result = []

    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const filename = files[fileIndex]
        const filepath = path.resolve(directory, filename)

        if (fs.lstatSync(filepath).isDirectory()) {
            result.push(...scan(filepath, match))
        } else if (filepath.match(match)) {
            result.push(filepath)
        }
    }

    return result
}
