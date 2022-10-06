import {combinedCreditsCast} from "../../types/MoviePageTypes";

export interface CreditsHistoryPropsType {
    credits: CreditsHistoryType
}

export interface CreditsHistoryType {
    cast:combinedCreditsCast[],
    crew:combinedCreditsCast[]
}