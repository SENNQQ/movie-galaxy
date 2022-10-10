import React, {FC, useEffect, useState} from 'react';
import Videos from "../../components/Videos";
import InfoPhotos from "../../components/InfoPhotos";
import {TvPropsType} from "../../types/TvShowPageTypes";
import MediaNav from "../../components/MediaNav";
import TvInfo from "../../components/TvInfo";
import Episodes from "../../components/Episodes";

const TvID:FC<TvPropsType> = ({item}) => {

    const [tab, setTab] = useState<string>('overview')
    const [menu, setMenu] = useState<string[]>([]);

    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    const createMenu = () => {
        const menu = [];
        // overview
        menu.push('Overview');
        // episodes
        if (showEpisodes())
            menu.push('Episodes');
        // videos
        if (showVideos()) menu.push('Videos');
        // images
        if (showImages()) menu.push('Photos');
        setMenu(menu);
    }

    const showEpisodes = (): number | null => {
        return item.number_of_seasons;
    }

    const showVideos = (): number | null => {
        const videos = item.videos;
        return videos && videos.results && videos.results.length;
    }

    const showImages = (): number | null => {
        const images = item.images;
        return images && ((images.backdrops && images.backdrops.length) || (images.posters && images.posters.length));
    }

    useEffect(()=>{
        createMenu();
    },[])


    return (
        <>
            <MediaNav menu={menu} changeTabHandler={changeTab}/>
            {tab === "overview" &&  <TvInfo item={item}/>}
            {tab === "episodes" &&  <Episodes numberOfSeasons={item.number_of_seasons}/>}
            {tab === "videos" && <Videos videos={item.videos.results}/>}
            {tab === "photos" && <InfoPhotos image={item.images}/>}
        </>
    );
};

export default TvID;