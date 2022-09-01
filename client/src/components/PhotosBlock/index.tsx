import React, {FC} from 'react';
import st from "../InfoPhotos/photos.module.scss";
import cn from "classnames";
import {PhotosBlockPropsType} from "./types";

const PhotosBlock:FC<PhotosBlockPropsType> = ({title,
                                                  countImage,
                                                  Image,
                                                  openModal}) => {
    return (
        <div className="spacing">
            <div className="spacing__head">
                <h2 className="spacing__title">{title}</h2>
                <strong className="spacing__count"> {countImage} Изображения</strong>
            </div>
            <div className={st.items__photos}>
                {Image.map((item,index) =>
                    <div className={cn(st.item)}
                         key={item}
                         onClick={(event)=>openModal(event,index)}>
                        <a href={item}>
                            <div className={st.image}>
                                <img src={item} alt=""/>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotosBlock;