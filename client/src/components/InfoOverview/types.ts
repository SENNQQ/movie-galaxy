import {ExternalLinksType} from "../ExternalLinks/types";

export interface InfoOverviewPropsType {
    "item": InfoOverviewType
}

export interface InfoOverviewType {
    "overview": string,
    "runtime": number,
    "name": string,
    "title": string,
    "release_date": string,
    "poster_path": string,
    "credits": {
        "cast": [{}]
        "crew": [{}]
    },
    "budget": number,
    "revenue": number,
    "status": string,
    "original_language": string,
    "external_ids": ExternalLinksType,
    "genres": GenresType[]
    "production_companies": productionCompaniesType[]
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