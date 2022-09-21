import {imageProps} from "../../types/MoviePageTypes";

export interface InfoPhotosPropsType {
    "image": {
        "backdrops": imageProps[],
        "logos": imageProps[],
        "posters": imageProps[]
    },
}