import {CastUnitedCrew} from "../../../types/MoviePageTypes";

export interface CreditsHistoryPropsType {
    credits: CreditsHistoryType
}

export interface CreditsHistoryType {
    cast:CastUnitedCrew[],
    crew:CastUnitedCrew[]
}