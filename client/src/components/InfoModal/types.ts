import {movieDataType} from "../VideoItem/types";


export interface InfoModalMoviePropsType {
    data: movieDataType[],
    selectIndex: number,
    closeModal: ()=>void,
    changeSelectIndex:(direction:string)=>void,
}

export interface InfoModalPhotoPropsType {
    data: string[],
    selectIndex: number,
    closeModal: ()=>void,
    changeSelectIndex:(direction:string)=>void,
}