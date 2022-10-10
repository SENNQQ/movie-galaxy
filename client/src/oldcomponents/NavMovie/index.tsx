import React, {FC} from 'react';
import st from './navmovie.module.scss'
import cn from 'classnames'
import {NavMoviePropsType} from "./types";


const NavMovie:FC<NavMoviePropsType> = ({
                                            nameTab,
                                            changeTabHandler,
                                            videos,
                                            images}) => {

    const showVideos = () => {
        const video = videos;
        return videos && video.results && video.results.length;
    }

    const showImages = () => {
        const image = images;
        return images && ((image.backdrops && image.backdrops.length) || (image.posters && image.posters.length));
    }

    return (
        <div className={st.nav_movie}>
            <button type="button"
                    className={cn(st.button_movie, {[st.buttonActive]:nameTab==="overview"})}
                    onClick={()=>changeTabHandler("overview")}>
                Overview
            </button>
            {showVideos() > 0 && <button type="button"
                     className={cn(st.button_movie, {[st.buttonActive]: nameTab === "videos"})}
                     onClick={() => changeTabHandler("videos")}>
                Videos
            </button>
            }
            {showImages() > 0 && <button type="button"
                     className={cn(st.button_movie, {[st.buttonActive]: nameTab === "photos"})}
                     onClick={() => changeTabHandler("photos")}>
                Photos
            </button>}
        </div>
    );
};

export default NavMovie;