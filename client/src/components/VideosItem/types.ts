import React from "react";
import {videosProps} from "../../types/MoviePageTypes";


export interface InfoVideoItemPropsType {
    openVideoHandler: (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => void,
    videosData: videosProps
    movieIndex: number
}

export type movieDataType = {
    movieDuration: string,
    movieName: string,
    movieType: string,
    movieUrlTrailer: string,
}