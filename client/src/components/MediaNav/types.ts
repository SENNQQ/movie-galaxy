import {CSSProperties} from "react";

export interface MediaNavType {
    menu:string[],
    changeTabHandler: (nameTab:string) => void,
    styleContainer?: CSSProperties
    styleButton?: CSSProperties
}