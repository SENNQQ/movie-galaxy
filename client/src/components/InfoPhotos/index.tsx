import React, {FC} from 'react';
import Carousel from "../Carousel";
import PhotosBlock from "../PhotosBlock";
import {InfoPhotosPropsType} from "./types";


const InfoPhotos: FC<InfoPhotosPropsType> = ({image}) => {

    return (
        <>
            {image.backdrops.length && <PhotosBlock title="Backdrops"
                                                                 type={"backdrop"}
                                                                 image={image.backdrops}/>
            }
            {image.posters.length && <PhotosBlock title="Posters"
                                                  type={"posters"}
                                                  image={image.posters}/>
            }

            {/*<Carousel/>*/}
        </>
    );
};

export default InfoPhotos;