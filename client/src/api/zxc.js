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
        { title: 'Актуальные фильмы', query: 'trending' },
        { title: 'Популярные фильмы', query: 'popular' },
        { title: 'Фильмы с самым высоким рейтингом', query: 'top_rated' },
        { title: 'Предстоящие фильмы', query: 'upcoming' },
        { title: 'Сейчас воспроизводятся фильмы', query: 'now_playing' },
    ],
    tv: [
        { title: 'Актуальные телешоу', query: 'trending' },
        { title: 'Популярные телешоу', query: 'popular' },
        { title: 'Самые рейтинговые телешоу', query: 'top_rated' },
        { title: 'В настоящее время транслируются телешоу', query: 'on_the_air' },
        { title: 'Телешоу, которые выходят сегодня в эфир', query: 'airing_today' },
    ],
}

/**
 * Get list item
 */
export function getListItem (type, query) {
    if (type === 'movie') {
        return lists.movie.find(list => list.query === query);
    } else if (type === 'tv') {
        return lists.tv.find(list => list.query === query);
    }
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