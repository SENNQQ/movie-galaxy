import {iCategoryOrGenresFetchData} from "../../types/MainPageTypes";

export interface iGenre {
    id:number,
    name:string
}

export interface iGenresFetchData extends iCategoryOrGenresFetchData{
    genre:iGenre
}