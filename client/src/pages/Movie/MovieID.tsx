import React, {FC, useEffect, useState} from 'react';
import MovieInfo from "../../components/Movie/MovieInfo";
import Videos from "../../components/Videos";
import Images from "../../components/Images";
import {MoviePropsTypes} from "../../types/MoviePageTypes";
import MediaNav from "../../components/MediaNav";



const MovieID:FC<MoviePropsTypes> = ({item}) => {

    const [tab, setTab] = useState<string>('overview')
    const [menu, setMenu] = useState<string[]>([]);

    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    const showVideos = () => {
        const videos = item.videos;
        return videos && videos.results && videos.results.length;
    }

    const showImages = () => {
        const images = item.images;
        return images && ((images.backdrops && images.backdrops.length) || (images.posters && images.posters.length));
    }

    const createMenu = () => {
        const menu = [];
        // overview
        menu.push('Overview');
        // videos
        if (showVideos())
            menu.push('Videos');
        // images
        if (showImages())
            menu.push('Photos');
        setMenu(menu);
    }

    useEffect(()=>{
        createMenu();
    },[])

    return (
        <>
            <MediaNav menu={menu} changeTabHandler={changeTab}/>
            {tab === "overview" &&  <MovieInfo item={item}/>}
            {tab === "videos" && <Videos videos={item.videos.results}/>}
            {tab === "photos" && <Images image={item.images}/>}
        </>
    );
};

export default MovieID;