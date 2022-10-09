import {castProps} from "../../types/MoviePageTypes";

export interface EpisodesPropsType {
    numberOfSeasons:number
}

export interface episodesType {
    air_date: string
    crew: [castProps]
    episode_number: number
    guest_stars: []
    id: number
    name: string
    overview: string
    production_code: string
    runtime: number
    season_number:number
    show_id: number
    still_path: string
    vote_average: number
    vote_count: number
}