import React, {FC, useState} from 'react';

import st from "./video.module.scss"

import Carousel from "../Carousel";
import ModalIframeVideo from "../ModalIframeVideo";
import InfoVideoItem from "../InfoVideoItem";
import {movieDataType} from "../InfoVideoItem/types";


const videoItem: movieDataType[] = [
    {
        movieDuration: "2:10",
        movieName: "Groundbreaking Cameras",
        movieType: "Behind the Scenes",
        movieUrlTrailer: "https://youtube.com/watch?v=EM2SmqGFTpo",
    },
    {
        movieDuration: "2:15",
        movieName: "Groundbreaking Cameras",
        movieType: "Behind the Scenes",
        movieUrlTrailer: "https://youtube.com/watch?v=96oC5P4MRqQ",
    }
]



const InfoVideo: FC = () => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const openModel = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    return (
        <>

            <div className={"spacing"}>
                <div className={st.headDropdown}>
                    <select name="infoVideo_dropdown">
                        <option value="all">All</option>
                        <option value="Behind the Scenes">Behind the Scnes</option>
                        <option value="Clip">Clip</option>
                        <option value="Teaser">Teaser</option>
                        <option value="Trailer">Trailer</option>
                    </select>
                    <strong className={st.headDropdown__count}>21 Videos</strong>
                </div>
                <div className={st.items__Video}>
                    {/*href="https://youtube.com/watch?v=96oC5P4MRqQ"*/}

                    {videoItem.map((item, index) =>
                        <InfoVideoItem openVideoHandler={openModel}
                                       movieData={item}
                                       movieIndex={index}
                                       key={index + 1}
                        />)
                    }

                </div>

                {modalVisible && <ModalIframeVideo
                    movieData={videoItem}
                    movieSelectIndex={modalStartAt}
                />}
            </div>
            <Carousel/>
            <Carousel/>
        </>
    );
};

export default InfoVideo;