import {castProps} from "../../types/MoviePageTypes";
import {ExternalLinksType} from "../ExternalLinks/types";

export interface TvInfoPropsType {
    "item": TvInfoProps
}

export interface TvInfoProps {
    "id":number,
    "overview": string,
    "name": string,
    first_air_date:string,
    last_air_date:string,
    "episode_run_time": number[],
    number_of_seasons: number,
    number_of_episodes: number,
    networks:[{
        id: number
        logo_path: string
        name: string
        origin_country: string
    }],
    "poster_path": string,
    "credits": {
        "cast": [castProps]
        "crew": [castProps]
    },
    "status": string,
    "original_language": string,
    "external_ids": ExternalLinksType,
    "genres": GenresType[],
}

export interface GenresType {
    "id": number,
    "name": string
}

export interface productionCompaniesType {
    "id": number,
    "logo_path": string,
    "name": string,
    "origin_country": string
}