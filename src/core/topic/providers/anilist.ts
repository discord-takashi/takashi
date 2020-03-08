import axios, { AxiosError } from 'axios'

import { TopicProvider } from '../topic-provider'

import Constants from './anilist.constants'

/**
 * The topic provider of `anilist.co`.
 */
export class AnilistTopicProvider extends TopicProvider {
    /**
     * Initializes the topic provider for `anilist.co`.
     */
    public constructor() {
        super('anilist.co')
    }

    /**
     * Creates a new request for a topic.
     */
    public async request(query: string, variables: any) {
        const requestBody = JSON.stringify({ query, variables })
        const headers = {
            'content-type': 'application/json'
        }

        return axios
            .post(Constants.ENDPOINT, requestBody, { headers })
            .then(response => response.data) // response.data is axios internal to get the response body.
            .then(response => response.data.Media) // response.data.Media is from GraphQL response
    }

    /**
     * Retrieves the topic from `anilist.co` GraphQL API.
     */
    public async fetchTopic(search: string) {
        const variables = { search }
        const response = await this.request(
            Constants.MEDIA_QUERY,
            variables
        ).catch((error) => error)

        if ((response as AxiosError).isAxiosError) {
            throw new Error(`This title cannot be found inside ${this.name}.`)
        }

        const nextEpisodeToBeAired = response.airingSchedule.nodes[0]
        if (!nextEpisodeToBeAired) {
            throw new Error('The provided title is not releasing episodes.')
        }

        return {
            id: response.id,
            name: response.title.romaji,
            provider: this.name,
            description: `The episode ${nextEpisodeToBeAired.episode} of ${response.title.romaji} aired.`,
            airsAt: nextEpisodeToBeAired.airingAt * 1000,
            properties: {
                thumbnail: response.coverImage.large,
                color: response.coverImage.color
            }
        }
    }
}
