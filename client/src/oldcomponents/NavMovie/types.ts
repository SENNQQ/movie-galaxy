import {imageProps, videosProps} from "../../types/MoviePageTypes";


export interface NavMoviePropsType {
    nameTab: string,
    changeTabHandler: (nameTab:string) => void,
    videos:{
        results:[videosProps]
    },
    images:{
        backdrops:imageProps[],
        posters:imageProps[],
    }
}