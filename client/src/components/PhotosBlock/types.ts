import React from "react";

export interface PhotosBlockPropsType {
    title:string,
    countImage:number,
    Image:string[],
    openModal:(event:React.MouseEvent<HTMLDivElement, MouseEvent>, indexVideo: number) => void,
}