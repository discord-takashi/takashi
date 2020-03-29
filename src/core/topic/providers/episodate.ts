import axios, { AxiosError } from 'axios'

import { TopicProvider } from '../topic-provider'

import Constants from './episodate.constants'

/**
 * The topic provider of `episodate`.
 */
export class EpisodateTopicProvider extends TopicProvider {
    /**
     * Initializes the topic provider for `episodate`.
     */
    public constructor() {
        super('episodate', 'tv')
    }

    /**
     * Fetchs a resource from the `episodate` API.
     */
    public async request(route: string) {
        return axios.get(Constants.ENDPOINT + route)
            .then(response => response.data)
            .catch(error => this.throwRequestError(error))
    }

    /**
     * Throws the given error.
     */
    public throwRequestError(error: AxiosError) {
        console.log(error.message, error.response!.data)
        throw new Error(`The provider "${this.name}" was not able to reply the request.`)
    }

    /**
     * Retrieves the topic from `episodate` REST API.
     */
    public async fetchTopic(search: string) {
        const searchResponse = await this.request(Constants.ROUTES.search(search))
        const searchFirstQuery = searchResponse.tv_shows.find((result: any) => 
            result.name.toLowerCase().startsWith(search.toLowerCase()) && // episodate has a bad search engine 
            result.status === 'Running'
        )

        if (!searchFirstQuery) {
            throw new Error(`This title cannot be found inside ${this.name}.`)
        }

        const detailsResponse = await this.request(
            Constants.ROUTES.show_details(searchFirstQuery.id)
        ).then((data: any) => data.tvShow)

        const { id, name, countdown, status, image_thumbnail_path } = detailsResponse

        if(status !== 'Running' && !countdown) {
            throw new Error(`This provided title is not realeasing episodes.`)
        }

        const { episode, air_date } = countdown
        const airDate = new Date(air_date)

        return {
            id,
            name,
            provider: this.name,
            description: `The episode ${episode} of ${name} aired.`,
            airsAt: airDate.getTime(),
            properties: {
                thumbnail: image_thumbnail_path,
                color: 'rgb(93, 120, 228)'
            }
        }
    }
}
