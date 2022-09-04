import axios from '../axios';

/**
 * API url
 */
const apiUrl = 'https://api.themoviedb.org/3';

/**
 * Image url
 */
export const apiImgUrl = 'https://image.tmdb.org/t/p';

/**
 * Different types of lists
 */
const lists = {
    movie: [
        { title: 'Популярные фильмы', query: 'trending' },
        { title: 'Popular Movies', query: 'popular' },
        { title: 'Top Rated Movies', query: 'top_rated' },
        { title: 'Upcoming Movies', query: 'upcoming' },
        { title: 'Now Playing Movies', query: 'now_playing' },
    ],
    tv: [
        { title: 'Trending TV Shows', query: 'trending' },
        { title: 'Popular TV Shows', query: 'popular' },
        { title: 'Top Rated TV Shows', query: 'top_rated' },
        { title: 'Currently Airing TV Shows', query: 'on_the_air' },
        { title: 'TV Shows Airing Today', query: 'airing_today' },
    ],
}

/**
 * Get TV show (single)
 */
export function getTvShow (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/tv/${id}`, {
            params: {
                api_key: process.env.API_KEY,
                language: process.env.API_LANG,
                append_to_response: 'videos,credits,images,external_ids,content_ratings',
                include_image_language: 'en',
            },
        }).then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Get movie (single)
 */
export function getMovie (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/movie/${id}`, {
            params: {
                api_key: process.env.API_KEY,
                language: process.env.API_LANG,
                append_to_response: 'videos,credits,images,external_ids,release_dates',
                include_image_language: 'en',
            },
        }).then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Get trending
 */
export function getTrending (media, page = 1) {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/trending/${media}/week`, {
            params: {
                api_key: process.env.API_KEY,
                language: process.env.API_LANG,
                page,
            },
        }).then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}