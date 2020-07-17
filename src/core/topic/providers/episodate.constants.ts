import querystring from 'querystring'

export default {
    /**
     * The endpoint for API requests.
     */
    ENDPOINT: 'https://www.episodate.com/api',

    /**
     * The routes available from this provider.
     */
    ROUTES: {
        show_details: (id: string) => `/show-details?q=${id}`,
        search: (query: string, page: number = 0) => {
            const urlQuery = querystring.stringify({ q: query, page })
            return `/search?${urlQuery}`
        },
    },
}
