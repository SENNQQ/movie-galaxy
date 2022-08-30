import {movieDataType} from "../InfoVideoItem/types";


export interface ModalIframeVideoPropsType {
    movieData: movieDataType[],
    movieSelectIndex: number,
    closeModal: ()=>void,
    changeSelectIndex:(direction:string)=>void,
}