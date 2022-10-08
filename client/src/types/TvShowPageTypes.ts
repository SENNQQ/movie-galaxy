import {castProps, imageProps, videosProps} from "./MoviePageTypes";
import {ExternalLinksType} from "../components/ExternalLinks/types";

export interface TvPropsType {
    "item": TvAllPropsType,
}

export interface TvAllPropsType {
    "backdrop_path": string,
    "adult": boolean
    "content_ratings": {
        "results": [{
            iso_3166_1: string,
            rating: string
        }]
    },
    "create_by": [{
        credit_id: string,
        gender: number
        id: number,
        name: string,
        profile_path: string
    }],
    "credits": {
        "cast": [castProps],
        "crew": [castProps],
    },
    "external_ids": ExternalLinksType,
    "first_air_date": string,
    "episode_run_time": number[],
    "genres": [
        {
            "id": number,
            "name": string
        },
    ],
    "homepage": string,
    "id": number,
    "images": {
        "backdrops": imageProps[],
        "logos": imageProps[],
        "posters": imageProps[]
    },
    in_production: boolean,
    languages: string[]
    last_air_date: string,
    last_episode_to_air: {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        runtime: number
        season_number: number
        show_id: number
        still_path: string
        vote_average: number
        vote_count: number
    }
    "name": string,
    networks:[{
        id: number
        logo_path: string
        name: string
        origin_country: string
    }],
    next_episode_to_air: string
    number_of_episodes: number
    number_of_seasons: number
    "origin_country": string[]
    "original_language": string,
    "original_name": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "production_companies": [{
        "id": number,
        "logo_path": string,
        "name": string,
        "origin_country": string
    }],
    "production_countries": [{
        "iso_3166_1": string,
        "name": string
    }],
    seasons:[{
        air_date: string
        episode_count: number
        id: number
        name: string
        overview:string
        poster_path: string
        season_number: number
    }],
    "spoken_languages": [{
        "english_name": string,
        "iso_639_1": string,
        "name": string
    }],
    status: string,
    "tagline": string,
    "type": string,
    "videos": {
        "results": [videosProps]
    },
    "vote_average": number,
    "vote_count": number,
}