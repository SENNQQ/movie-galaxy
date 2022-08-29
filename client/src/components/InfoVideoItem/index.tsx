import React, {FC} from 'react';
import st from "./videoItem.module.scss";
import zxc from "../../image/mqdefault.jpg";
import {InfoVideoItemPropsType} from "./types";

const InfoVideoItem:FC<InfoVideoItemPropsType> = ({openVideoHandler,movieData,movieIndex}) => {


    return (
        <div className={st.item}>
            <a href={movieData.movieUrlTrailer}
               onClick={(event)=>openVideoHandler(event, movieIndex)}>
                <div className={st.item__image}>
                    <img src={zxc} alt="zxc"/>
                    <div className={st.item__image__duration}> {movieData.movieDuration} </div>
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
                <div className={st.item__name}>{movieData.movieName}</div>
                <div className={st.item__type}>{movieData.movieType}</div>
            </a>
        </div>
    );
};

export default InfoVideoItem;