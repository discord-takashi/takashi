import { TopicProvider } from './topic-provider'
import { AnilistTopicProvider } from './providers/anilist'

/**
 * The repository for topic providers.
 */
export class TopicProviderRepository {
    /**
     * The topic providers stored inside this repository.
     */
    protected topicProviders: TopicProvider[]

    /**
     * Initializes the topic provider repository.
     */
    public constructor() {
        this.topicProviders = []
    }

    /**
     * Finds a provider by the name.
     */
    public find(name: string) {
        return this.topicProviders.find(
            (provider: TopicProvider) => provider.name === name
        )
    }
}
