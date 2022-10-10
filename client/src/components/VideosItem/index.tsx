import React, {FC} from 'react';
import st from "./videoItem.module.scss";
import {InfoVideoItemPropsType} from "./types";

const VideosItem:FC<InfoVideoItemPropsType> = ({openVideoHandler,videosData,movieIndex}) => {

    const getSeconds  = (duration:any):any => {
        try{
            let a:any = duration.match(/\d+/g);
            if (a !== null && duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
                a = [0, a[0], 0];
            }
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
                a = [a[0], 0, a[1]];
            }
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
                a = [a[0], 0, 0];
            }
            let videoLength = 0;
            if (a.length === 3) {
                duration = videoLength + parseInt(a[0]) * 3600;
                duration = videoLength + parseInt(a[1]) * 60;
                duration = videoLength + parseInt(a[2]);
            }
            if (a.length === 2) {
                duration = videoLength + parseInt(a[0]) * 60;
                duration = videoLength + parseInt(a[1]);
            }
            if (a.length === 1) {
                duration = videoLength + parseInt(a[0]);
            }
            return duration;
        }catch (e) {
            return "error"
        }
    };

    const formatDuration  = (duration:any) => {
        let secondsLeft = getSeconds(duration);
        if(secondsLeft !== "error"){
            // hours
            // const hours = Math.floor(secondsLeft / 3600);
            secondsLeft = secondsLeft % 3600;
            // mins
            const mins = Math.floor(secondsLeft / 60);
            secondsLeft = secondsLeft % 60;
            // prepend 0 if less than 10
            if (secondsLeft < 10) {
                secondsLeft = `0${secondsLeft}`;
            }
            return `${mins}:${secondsLeft}`;
        }
    };

    return (
        <div className={st.item}>
            <a href={videosData.url}
               onClick={(event)=>openVideoHandler(event, movieIndex)}>
                <div className={st.item__image}>
                    <img src={videosData.thumb} alt={videosData.name} loading="lazy"/>
                    <div className={st.item__image__duration}> {formatDuration(videosData.duration)} </div>
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

export default VideosItem;