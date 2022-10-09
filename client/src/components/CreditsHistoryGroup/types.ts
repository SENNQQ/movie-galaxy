import {CastUnitedCrew} from "../../types/MoviePageTypes";

export interface CreditsHistoryGroupProps {
    groups:{
        year:string,
        credits:CastUnitedCrew[]
    }
}