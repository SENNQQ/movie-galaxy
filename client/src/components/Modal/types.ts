import {movieDataType} from "../VideosItem/types";


// export interface InfoModalMoviePropsType {
//     data:string[],
//     type:string,
//     selectIndex: number,
//     closeModal: ()=>void,
//     changeSelectIndex:(direction:string)=>void,
// }

export interface InfoModalMoviePropsType {
    data:string[],
    type:string,
    startAt?:number,
    nav?:boolean
    closeModal: ()=>void,
}


// export interface InfoModalPhotoPropsType {
//     data: string[],
//     selectIndex: number,
//     closeModal: ()=>void,
//     changeSelectIndex:(direction:string)=>void,
// }