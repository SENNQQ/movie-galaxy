import React from 'react';
import zxc from "../../image/mqdefault.jpg";
import st from "./video.module.scss"

import Carousel from "../Carousel";

const InfoVideo = () => {
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
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                    <div className={st.item}>
                        <a href="https://youtube.com/watch?v=96oC5P4MRqQ">
                            <div className={st.item__image}>
                                <img src={zxc} alt="zxc"/>
                                <div className={st.item__image__duration}> 2:10</div>
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
                            <div className={st.item__name}>Groundbreaking Cameras</div>
                            <div className={st.item__type}>Behind the Scenes</div>
                        </a>
                    </div>
                </div>
            </div>
            <Carousel/>
            <Carousel/>
        </>
    );
};

export default InfoVideo;