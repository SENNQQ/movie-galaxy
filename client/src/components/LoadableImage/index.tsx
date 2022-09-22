import React, {FC, useEffect, useRef, useState} from 'react';
import cn from "classnames";
import st from "./loadableImage.module.scss";
import {useOnScreen} from "../../hooks/useOnScreen";

export interface ILoadableImage {
    src: string,
    alt?: string,
    onLoad?(): void,
    type?: string,
}

const LoadableImage: FC<ILoadableImage> = ({
                                               src,
                                               alt= "",
                                               onLoad= () =>{},
                                               type="posters"
                                           }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const onScreen:boolean = useOnScreen<HTMLDivElement>(containerRef);


    useEffect(()=>{

        if(!onScreen || isLoaded){
            return
        }

        if(imageRef.current){
            imageRef.current.onload = () => setIsLoaded(true);
            onLoad();
        }
        
    },[isLoaded, onLoad, onScreen])

    return (
        <div ref={containerRef} className={cn(st.image, {
            [st.lazyloaded]:isLoaded,
            [st.lazyloading]:!isLoaded,
        })}>
            {(onScreen || isLoaded) && <img src={src} className={st.lazyload} alt={alt} ref={imageRef}/>}
        </div>
    );
};

export default LoadableImage;