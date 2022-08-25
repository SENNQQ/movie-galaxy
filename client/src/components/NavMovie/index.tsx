import React, {FC} from 'react';
import st from './navmovie.module.scss'
import cn from 'classnames'
import {NavMoviePropsType} from "./types";


const NavMovie:FC<NavMoviePropsType> = ({nameTab, changeTabHandler}) => {

    return (
        <div className={st.nav_movie}>
            <button type="button"
                    className={cn(st.button_movie, {[st.buttonActive]:nameTab==="overview"})}
                    onClick={()=>changeTabHandler("overview")}
            >
                Overview
            </button>
            <button type="button"
                    className={cn(st.button_movie, {[st.buttonActive]:nameTab==="videos"})}
                    onClick={()=>changeTabHandler("videos")}
            >
                Videos
            </button>
            <button type="button"
                    className={cn(st.button_movie, {[st.buttonActive]:nameTab==="photos"})}
                    onClick={()=>changeTabHandler("photos")}
            >
                Photos
            </button>
        </div>
    );
};

export default NavMovie;