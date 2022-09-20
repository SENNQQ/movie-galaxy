import React, {FC, useEffect, useState} from 'react';

import st from "./video.module.scss"

import Modal from "../Modal";
import VideoItem from "../VideoItem";
import {InfoVideoPropsType} from "./types";
import {videosProps} from "../../types/MoviePageTypes";
import {getYouTubeVideo} from "../../api/zxc";



const InfoVideo:FC<InfoVideoPropsType> = ({videos}) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const [activeVideos, setActiveVideos] = useState<videosProps[]>(videos);

    const [modalActiveVideo, setModalActiveVideo] = useState<string[]>();

    const openModel = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalStartAt(0);
        setModalVisible(false);
    }

    //Авто заполнение дропдауна типами фильмов которые хроняться в массиве
    const videoTypes = () => {
        return videos.map(video => video.type)
            .filter((videoType, index, self) => self.indexOf(videoType) === index)
    }

    //Сортировка активных видео через dropdown
    const filterVideos = (event:React.ChangeEvent<HTMLSelectElement>) => {
        let sortVideo = videos.filter(video => event.currentTarget.value === 'all'
            ? true : video.type === event.currentTarget.value);
        // let sortUrlVideo = sortVideo.map(video => video.movieUrlTrailer);
        // setModalActiveVideo(sortUrlVideo);
        setActiveVideos(sortVideo);
    }

    useEffect(()=>{
        const ids = videos.map(video => video.key).join(',');

        videos.forEach((video) => {
            video.thumb = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
            video.src = `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`;
            video.url = `https://youtube.com/watch?v=${video.key}`;
        });
        // get video duration from YouTube api
        getYouTubeVideo(ids).then((response) => {
            videos.forEach((video,index) =>{
                if (response.items[index]) {
                    video.duration = response.items[index].contentDetails.duration;
                }
            })
        });
    }, [videos])

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
                                   videosData={item}
                                   movieIndex={index}
                                   key={index + 1}/>)
                    }

                </div>

                {/*{modalVisible && modalActiveVideo && <Modal*/}
                {/*    data={modalActiveVideo}*/}
                {/*    type={"iframe"}*/}
                {/*    nav={true}*/}
                {/*    startAt={modalStartAt}*/}
                {/*    closeModal={closeModel}/>*/}
                {/*}*/}
            </div>
            {/*<Carousel/>*/}
        </>
    );
};

export default InfoVideo;