// import {cinemaProps} from "./MainPageTypes";

import {ExternalLinksType} from "../components/ExternalLinks/types";

export interface MoviePropsTypes {
    "item": allPropsMovie,
}

export interface allPropsMovie {
    "title": string,
    "release_date": string,
    "video": boolean,
    "name": string,
    "first_air_date": string,
    "origin_country": string[]
    "adult": boolean
    "backdrop_path": string,
    "id": number,
    "original_language": string,
    "original_name": string,
    "original_title": string,
    "overview": string,
    "poster_path": string,
    "profile_path": string,
    "media_type": string,
    "genre_ids": number[],
    "popularity": number,
    "vote_average": number,
    "vote_count": number,
    runtime: number,
    "belongs_to_collection": {
        "id": number,
        "name": string,
        "poster_path": string,
        "backdrop_path": string
    },
    "budget": number,
    "genres": [
        {
            "id": number,
            "name": string
        },
    ],
    "homepage": string,
    "imdb_id": number,
    "production_companies": [{
        "id": number,
        "logo_path": string,
        "name": string,
        "origin_country": string
    },
    ],
    "production_countries"?: [{
        "iso_3166_1": string,
        "name": string
    }
    ],
    "revenue": 755000000,
    "spoken_languages": [{
        "english_name": string,
        "iso_639_1": string,
        "name": string
    }
    ],
    "status": string,
    "tagline": string,
    "credits": {
        "cast": [castProps],
        "crew": [castProps],
    },
    "videos": {
        "results": [videosProps]
    },
    "external_ids": {
        "imdb_id": string,
        "facebook_id": string,
        "instagram_id": string,
        "twitter_id": string
    },
    "images": {
        "backdrops": imageProps[],
        "logos": imageProps[],
        "posters": imageProps[]
    },
    "release_dates": {
        "results": [
            {
                "iso_3166_1": string,
                "release_dates": [
                    {
                        "certification": string,
                        "iso_639_1": string,
                        "note": string,
                        "release_date": string,
                        "type": number
                    }
                ]
            },
        ]
    }
}

export interface videosProps {
    "iso_639_1": string,
    "iso_3166_1": string,
    "name": string,
    "key": string,
    "site": string,
    "size": number,
    "type": string,
    "official": boolean,
    "published_at": string,
    "id": string,
    "thumb": string,
    "src": string,
    "url": string,
    "duration": string
}

export interface imageProps {
    "aspect_ratio": number,
    "height": number,
    "iso_639_1": string,
    "file_path": string,
    "vote_average": number,
    "vote_count": number,
    "width": number,
    "thumb": string,
    "src": string,
}

export interface castProps {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    department:string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string
}

export interface combinedCreditsCast {
    adult: boolean
    backdrop_path: string
    credit_id: string
    department: string
    first_air_date:string
    genre_ids: number[]
    id: number
    year:string
    job: string
    character:string
    episode_count:number
    media_type: string
    original_language:string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    profile_path:string
    release_date: string
    title: string
    name:string
    video: boolean
    vote_average:number
    vote_count: number
}

export interface peopleProps {
    adult: boolean
    also_known_as:[string]
    biography:string
    birthday:string
    character: string
    combined_credits:{
        cast:combinedCreditsCast[],
        crew:combinedCreditsCast[]
    }
    deathday?: string
    credit_id: string
    external_ids:ExternalLinksType
    gender: number
    homepage?:string
    id: number
    images:{
        profiles:[imageProps]
    }
    imdb_id:string
    known_for_department: string
    name: string
    place_of_birth:string
    popularity: number
    profile_path: string
}