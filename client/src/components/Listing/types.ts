import {cinemaProps} from "../../types/MainPageTypes";

export interface ListingPropsType {
    items:cinemaProps[],
    title?:string,
    loading?:boolean,
    loadMore?:()=>void,
    closeSearch?:()=>void
}
