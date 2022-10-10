import React, {FC} from 'react';
import ImagesItem from "../ImagesItem";
import {InfoPhotosPropsType} from "./types";


const Images: FC<InfoPhotosPropsType> = ({image}) => {

    return (
        <>
            {image.backdrops.length && <ImagesItem title="Backdrops"
                                                   type={"backdrop"}
                                                   image={image.backdrops}/>
            }
            {image.posters.length && <ImagesItem title="Posters"
                                                 type={"posters"}
                                                 image={image.posters}/>
            }

            {/*<Carousel/>*/}
        </>
    );
};

export default Images;