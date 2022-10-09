import {cinemaProps} from "../../types/MainPageTypes";

export interface iGenre {
    id:number,
    name:string
}

export interface iGenresFetchData {
    items: {
        page:number
        results:cinemaProps[]
        total_pages: number
        total_results: number
    },
    genre:iGenre
}