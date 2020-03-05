/**
 * Error generator for promises.
 */
export default function error(message: string) {
    return (error: Error) => {
        console.error(message)
        console.error(`Reason: ${error.message}`)
    }
}
