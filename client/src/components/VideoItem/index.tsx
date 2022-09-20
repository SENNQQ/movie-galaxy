import React, {FC} from 'react';
import st from "./videoItem.module.scss";
import {InfoVideoItemPropsType} from "./types";

const VideoItem:FC<InfoVideoItemPropsType> = ({openVideoHandler,videosData,movieIndex}) => {


    return (
        <div className={st.item}>
            <a href={videosData.url}
               onClick={(event)=>openVideoHandler(event, movieIndex)}>
                <div className={st.item__image}>
                    <img src={videosData.thumb} alt={videosData.name} loading="lazy"/>
                    <div className={st.item__image__duration}> {videosData.duration} </div>
                    <div className={st.item__image__play}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 55 55">
                            <circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="1.5"></circle>
                            <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"></path>
                        </svg>
                    </div>
                </div>
                <div className={st.item__name}>{videosData.name}</div>
                <div className={st.item__type}>{videosData.type}</div>
            </a>
        </div>
    );
};

export default VideoItem;