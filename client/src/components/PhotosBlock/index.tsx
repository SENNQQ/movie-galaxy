import React, {FC, useEffect, useState} from 'react';
import st from "../InfoPhotos/photos.module.scss";
import cn from "classnames";
import {PhotosBlockPropsType} from "./types";
import {apiImgUrl} from "../../api/zxc";
import Modal from "../Modal";

const PhotosBlock:FC<PhotosBlockPropsType> = ({title,
                                                  type,
                                                  image}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const [modalDataImage, setModalDataImage] = useState<string[]>([]);

    const openModel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalStartAt(0);
        setModalVisible(false);
    }


    useEffect(()=>{
        let thumb:string;

        if (type === 'poster') {
            thumb = `${apiImgUrl}/w370_and_h556_bestv2`;
        } else {
            thumb = `${apiImgUrl}/w533_and_h300_bestv2`;
        }

        // eslint-disable-next-line array-callback-return
        image.map((image,index) => {
            image.thumb = `${thumb}${image.file_path}`;
            image.src = `${apiImgUrl}/original${image.file_path}`;
            modalDataImage[index] = image.src;
        });

        setIsLoading(true);
        setModalDataImage(modalDataImage);
    }, [image, modalDataImage, type]);
    
    return (
        <>
            {isLoading && <div className="spacing">
                <div className="spacing__head">
                    <h2 className="spacing__title">{title}</h2>
                    <strong className="spacing__count"> {image.length} Изображения</strong>
                </div>
                <div className={st.items__photos}>
                    {image.map((item,index) =>
                        <div className={cn(st.item)}
                             key={`image-${index}`}
                             onClick={(event)=>openModel(event,index)}>
                            <a href={item.thumb}>
                                <div className={st.image}>
                                    <img src={item.thumb} alt=""/>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
            }
            {modalVisible && <Modal
                data={modalDataImage}
                type={"image"}
                startAt={modalStartAt}
                closeModal={closeModel}
                nav={true}
            />}
        </>
    );
};

export default PhotosBlock;