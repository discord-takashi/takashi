import { stripIndents } from 'common-tags'

export default {
    /**
     * The endpoint for API requests.
     */
    ENDPOINT: 'https://graphql.anilist.co/',

    /**
     * The query for medias.
     */
    MEDIA_QUERY: stripIndents`
        query ($search: String){
            Media(search: $search, status_in: [RELEASING, NOT_YET_RELEASED], type: ANIME, format_not: MUSIC) {
                id
                coverImage {
                    large
                    color
                }
                title {
                    romaji
                    english
                }
                airingSchedule(notYetAired: true, perPage: 1) {
                    nodes {
                        episode
                        timeUntilAiring
                        airingAt
                    }
                }
            }
        }
    `,
}
