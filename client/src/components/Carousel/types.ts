import {cinemaProps} from "../../types/MainPageTypes";
import {peopleProps} from "../../types/MoviePageTypes";

export interface CarouselType {
    unusableVisibleWidth: number,
    elementWidth: number,
    carouselWidth: number,
    visibleWidth: number,
    maximumPosition: number,
    disableLeftButton: boolean,
    disableRightButton: boolean
}

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> =
    T extends any
        ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>

type MovieOrCast = StrictUnion<cinemaProps[] | [peopleProps]>

export interface CarouselPropsType {
    "items": MovieOrCast,
    "title": (()=>string) | string,
    "allUrl": ()=>{
        name: string,
    },
}