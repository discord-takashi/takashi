/**
 * The topic provider.
 */
export abstract class TopicProvider {
    /**
     * The name of the provider.
     */
    public name: string

    /**
     * The alias of the provider.
     */
    public alias: string

    /**
     * Initializes a new topic provider.
     */
    public constructor(name: string, alias?: string) {
        this.name = name
        this.alias = alias || name
    }

    /**
     * Fetchs a topic by search term.
     */
    public abstract fetchTopic(search: string): Promise<FetchTopicResult>
}

/**
 * The expected result from a `TopicProvider#fetchTopic`.
 */
export interface FetchTopicResult {
    id: string
    name: string
    provider: string
    description: string
    airsAt: number
    properties: any
}
