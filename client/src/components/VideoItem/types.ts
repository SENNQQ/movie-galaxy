import React from "react";


export interface InfoVideoItemPropsType {
    openVideoHandler: (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => void,
    movieData: movieDataType
    movieIndex: number
}

export type movieDataType = {
    movieDuration: string,
    movieName: string,
    movieType: string,
    movieUrlTrailer: string,
}