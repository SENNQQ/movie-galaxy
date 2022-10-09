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
            [st.lazyloading]:!isLoaded && src !== "",
        })}>
            {src === "" ?
                <span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="40" height="40" viewBox="0 0 24 24"
                             fillRule="evenodd" clipRule="evenodd"
                             fill="#999">
                            <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                        </svg>
                </span>
                :
                (onScreen || isLoaded) && <img src={src} className={st.lazyload} alt={alt} ref={imageRef}/>}
        </div>
    );
};

export default LoadableImage;