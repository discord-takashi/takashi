/**
 * The service for the `hello` command.
 */
export default class HelloService {
    /**
     * Prepares the hello message.
     */
    public hello(to: string): string {
        return `Hello, ${to}.`
    }
}
