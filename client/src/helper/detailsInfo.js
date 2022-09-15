/**
 * Name
 */
import {apiImgUrl} from "../api/zxc";

export const name = (item) => {
    return item.title ? item.title : item.name;
};

/**
 * Star rating
 */
export const stars = (item) => {
    if (item.vote_average) {
        return item.vote_average * 10;
    }
};

/**
 * Year started
 */
export const yearStart = (item) => {

    const date = item.release_date ? item.release_date : item.first_air_date;

    if (date) {
        return date.split('-')[0];
    }

};

/**
 * Trailer
 */
export const trailer = (item) => {

    let videos = item.videos.results;

    // if no videos, do nothing
    if (!videos.length) return null;

    // filter by type of video
    videos = videos.find(video => video.type === 'Trailer');

    // if no trailer found, do nothing
    if (!videos) return null;

    return [`https://www.youtube.com/embed/${videos.key}?rel=0&showinfo=0&autoplay=1`];

};


/**
 * Backdrop
 */
export const backdrop = (item) => {

    if (item.backdrop_path) {
        return `${apiImgUrl}/original${item.backdrop_path}`;
    }

};
