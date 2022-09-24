import React, {FC, useEffect, useState} from 'react';

import st from "./video.module.scss"

import Modal from "../Modal";
import VideoItem from "../VideoItem";
import {InfoVideoPropsType} from "./types";
import {videosProps} from "../../types/MoviePageTypes";
import {getYouTubeVideo} from "../../api/zxc";
import ContentLoader from "react-content-loader";


const InfoVideo: FC<InfoVideoPropsType> = ({videos}) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const [activeVideos, setActiveVideos] = useState<videosProps[]>(videos);

    const [ActiveVideo, setActiveVideo] = useState<string[]>();

    const [isLoading, setIsLoading] = useState<boolean>(true);


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
    const filterVideos = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let sortVideo = videos.filter(video => event.currentTarget.value === 'all'
            ? true : video.type === event.currentTarget.value);
        let sortUrlVideo = sortVideo.map(video => video.src);
        setActiveVideo(sortUrlVideo);
        setActiveVideos(sortVideo);
    }

    useEffect(() => {
        const ids = videos.map(video => video.key).join(',');

        videos.forEach((video) => {
            video.thumb = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
            video.src = `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`;
            video.url = `https://youtube.com/watch?v=${video.key}`;
        });
        setActiveVideo(videos.map(video=>video.src));
        getYouTubeVideo(ids).then((response) => {
            videos.forEach((video, index= 0) => {
                if (response.items[index]) {
                    video.duration = response.items[index].contentDetails.duration;
                }
            })
            setIsLoading(false);
        });
    }, [videos])
    console.log(videos);
    return (
        <>
            <div className={"spacing"}>

                {isLoading ? <ContentLoader
                        speed={2}
                        width={1800}
                        height={370}
                        viewBox="0 0 1800 370"
                        backgroundColor="#272727"
                        foregroundColor="#3b3b3b">
                        <rect x="0" y="0" rx="0" ry="0" width="180" height="47"/>
                        <rect x="0" y="78" rx="0" ry="0" width="366" height="206"/>
                        <rect x="0" y="295" rx="0" ry="0" width="100" height="17"/>
                        <rect x="0" y="324" rx="0" ry="0" width="100" height="17"/>
                        <rect x="414" y="78" rx="0" ry="0" width="366" height="206"/>
                        <rect x="414" y="295" rx="0" ry="0" width="100" height="17"/>
                        <rect x="414" y="324" rx="0" ry="0" width="100" height="17"/>
                        <rect x="828" y="78" rx="0" ry="0" width="366" height="206"/>
                        <rect x="828" y="295" rx="0" ry="0" width="100" height="17"/>
                        <rect x="828" y="324" rx="0" ry="0" width="100" height="17"/>
                        <rect x="196" y="15" rx="0" ry="0" width="76" height="24"/>
                    </ContentLoader>
                    :
                    <>
                        <div className={st.headDropdown}>

                            <select name="infoVideo_dropdown" onChange={(event) => filterVideos(event)}>
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

                        {modalVisible && ActiveVideo && <Modal
                            data={ActiveVideo}
                            type={"iframe"}
                            nav={true}
                            startAt={modalStartAt}
                            closeModal={closeModel}/>
                        }
                    </>
                }

            </div>
            {/*<Carousel/>*/}
        </>
    );
};

export default InfoVideo;