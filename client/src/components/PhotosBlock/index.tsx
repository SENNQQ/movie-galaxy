import React, {FC, useEffect, useState} from 'react';
import st from "../InfoPhotos/photos.module.scss";
import cn from "classnames";
import {PhotosBlockPropsType} from "./types";
import {apiImgUrl} from "../../api/zxc";
import Modal from "../Modal";
import ContentLoader from "react-content-loader";
import LoadableImage from "../LoadableImage";

const PhotosBlock: FC<PhotosBlockPropsType> = ({
                                                   title,
                                                   type,
                                                   image
                                               }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const [modalDataImage, setModalDataImage] = useState<string[]>([]);

    const openModel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        // document.body.classList.add('modal-open');
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalStartAt(0);
        // document.body.classList.remove('modal-open');
        setModalVisible(false);
    }


    useEffect(() => {
        let thumb: string;

        if (type === 'posters') {
            thumb = `${apiImgUrl}/w370_and_h556_bestv2`;
        } else {
            thumb = `${apiImgUrl}/w533_and_h300_bestv2`;
        }

        // eslint-disable-next-line array-callback-return
        image.map((image, index) => {
            image.thumb = `${thumb}${image.file_path}`;
            image.src = `${apiImgUrl}/original${image.file_path}`;
            modalDataImage[index] = image.src;
        });

        setModalDataImage(modalDataImage);
        setIsLoading(true);
    }, [image, modalDataImage, type]);

    return (
        <>
            <div className={cn("spacing")}>
                {!isLoading ?
                    <ContentLoader
                        speed={2}
                        width={1200}
                        height={403}
                        viewBox="0 0 1200 403"
                        backgroundColor="#272727"
                        foregroundColor="#3b3b3b">
                        <rect x="0" y="0" rx="0" ry="0" width="180" height="47" />
                        <rect x="0" y="76" rx="0" ry="0" width="287" height="162" />
                        <rect x="605" y="76" rx="0" ry="0" width="287" height="162" />
                        <rect x="907" y="76" rx="0" ry="0" width="287" height="162" />
                        <rect x="303" y="76" rx="0" ry="0" width="287" height="162" />
                        <rect x="0" y="253" rx="0" ry="0" width="287" height="162" />
                        <rect x="303" y="253" rx="0" ry="0" width="287" height="162" />
                        <rect x="605" y="253" rx="0" ry="0" width="287" height="162" />
                        <rect x="907" y="253" rx="0" ry="0" width="287" height="162" />
                    </ContentLoader>
                    :
                    <>
                        <div className="spacing__head">
                            <h2 className="spacing__title">{title}</h2>
                            <strong className="spacing__count"> {image.length} Изображения</strong>
                        </div>
                        <div className={st.items_photos}>
                            {image.map((item, index) =>
                                <div
                                     key={`image-${index}`}
                                     onClick={(event) => openModel(event, index)}>
                                    <a href={item.thumb}>
                                        <LoadableImage src={item.thumb}/>
                                    </a>
                                </div>
                            )}
                        </div>
                    </>
                }
            </div>
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