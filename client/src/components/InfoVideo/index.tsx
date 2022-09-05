import React, {FC, useState} from 'react';

import st from "./video.module.scss"

import Carousel from "../Carousel";
import InfoModal from "../InfoModal";
import VideoItem from "../VideoItem";
import {movieDataType} from "../VideoItem/types";


const videoItem: movieDataType[] = [
    {
        movieDuration: "2:10",
        movieName: "Groundbreaking Cameras",
        movieType: "Behind the Scenes",
        movieUrlTrailer: "https://youtube.com/embed/EM2SmqGFTpo",
    },
    {
        movieDuration: "2:15",
        movieName: "Groundbreaking Cameras",
        movieType: "Clip",
        movieUrlTrailer: "https://youtube.com/embed/96oC5P4MRqQ",
    },
    {
        movieDuration: "2:15",
        movieName: "Groundbreaking Cameras",
        movieType: "Clip",
        movieUrlTrailer: "https://youtube.com/embed/96oC5P4MRqQ",
    }
]


const InfoVideo: FC = () => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const [activeVideos, setActiveVideos] = useState<movieDataType[]>(videoItem)

    const openModel = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalStartAt(0);
        setModalVisible(false);
    }

    const videoTypes = () => {
        return videoItem.map(video => video.movieType)
            .filter((videoType, index, self) => self.indexOf(videoType) === index)
    }

    const filterVideos = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let zxc = videoItem.filter(video => event.currentTarget.value === 'all'
            ? true : video.movieType === event.currentTarget.value)
        setActiveVideos(zxc);
    }


    const changeSelectIndex = (direction: string) => {
        if (direction === 'prev') {
            let zxc = ((modalStartAt - 1) + activeVideos.length) % activeVideos.length;
            setModalStartAt(zxc)
        }
        if (direction === 'next') {
            let zxc = (modalStartAt + 1) % activeVideos.length;
            setModalStartAt(zxc)
        }
    }

    return (
        <>

            <div className={"spacing"}>
                <div className={st.headDropdown}>

                    <select name="infoVideo_dropdown" onChange={(event)=>filterVideos(event)}>
                        <option value="all">All</option>
                        {videoTypes().map((item) => <option value={item} key={item}>{item}</option>)}
                    </select>

                    <strong className={st.headDropdown__count}>
                        {activeVideos.length} {activeVideos.length > 1 ? "Videos" : "Video"}
                    </strong>
                </div>
                <div className={st.items__Video}>


                    {activeVideos.map((item, index) =>
                        <VideoItem openVideoHandler={openModel}
                                   movieData={item}
                                   movieIndex={index}
                                   key={index + 1}
                        />)
                    }

                </div>

                {modalVisible && <InfoModal
                    data={activeVideos}
                    selectIndex={modalStartAt}
                    closeModal={closeModel}
                    changeSelectIndex={changeSelectIndex}
                />}
            </div>
            {/*<Carousel/>*/}
            {/*<Carousel/>*/}
        </>
    );
};

export default InfoVideo;