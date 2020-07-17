import { TopicProvider } from './topic-provider'

import { AnilistTopicProvider } from './providers/anilist'
import { EpisodateTopicProvider } from './providers/episodate'

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
        this.topicProviders = [new AnilistTopicProvider(), new EpisodateTopicProvider()]
    }

    /**
     * Finds a provider by the name.
     */
    public find(name: string) {
        return this.topicProviders.find((provider: TopicProvider) => provider.name === name)
    }

    /**
     * Finds a topic by the alias.
     */
    public findByAlias(alias: string) {
        return this.topicProviders.find((provider: TopicProvider) => provider.alias === alias)
    }

    /**
     * @returns all topic providers registered inside this repository.
     */
    public all() {
        return this.topicProviders
    }
}
