// import {cinemaProps} from "./MainPageTypes";

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
        "cast": [{}],
        "crew": [{}],
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
        "backdrops": [
            {
                "aspect_ratio": number
                "height": number,
                "iso_639_1": string,
                "file_path": string,
                "vote_average": number,
                "vote_count": number,
                "width": number
            },
        ],
        "logos": [
            {
                "aspect_ratio": number,
                "height": number,
                "iso_639_1": string,
                "file_path": string,
                "vote_average": number,
                "vote_count": number,
                "width": number
            }
        ],
        "posters": [
            {
                "aspect_ratio": number,
                "height": number,
                "iso_639_1": string,
                "file_path": string,
                "vote_average": number,
                "vote_count": number,
                "width": number
            },
        ]
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
    "thumb":string,
    "src":string,
    "url":string,
    "duration":string
}