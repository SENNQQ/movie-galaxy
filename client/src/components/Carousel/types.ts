import {cinemaProps} from "../../types/MainPageTypes";

export interface CarouselType {
    unusableVisibleWidth: number,
    elementWidth: number,
    carouselWidth: number,
    visibleWidth: number,
    maximumPosition: number,
    disableLeftButton: boolean,
    disableRightButton: boolean
}

export interface CarouselPropsType {
    "items": cinemaProps[],
    "title": ()=>string,
    "allUrl": ()=>{
        name: string,
    }
}