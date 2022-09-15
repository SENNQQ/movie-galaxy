import {cinemaProps} from "../../types/MainPageTypes";

// export interface PanelMoviePropsTypes {
//     "item": cinemaProps,
// }

export interface PanelMoviePropsTypes {
    "item": PanelMovieTypes,
}

export interface PanelMovieTypes {
    "backdrop_path": string,
    "title":string,
    "name":string,
    "vote_count":number,
    "vote_average":number,
    "runtime":number,
    "release_date":string,
    "first_air_date":string,
    "overview":string,
}

// "original_name": string,
//     "original_title": string,
//     "title": string,
//     "vote_average": number,
//     "vote_count": number,
//     id:number,
