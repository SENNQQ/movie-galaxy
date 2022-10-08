import React, {FC, useEffect, useState} from 'react';
import InfoVideo from "../InfoVideo";
import InfoPhotos from "../InfoPhotos";
import {TvPropsType} from "../../types/TvShowPageTypes";
import MediaNav from "../NavPerson";
import TvInfo from "../TvInfo";
import Episodes from "../Episodes";

const TvDetails:FC<TvPropsType> = ({item}) => {

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

    console.log(item);

    return (
        <>
            <MediaNav menu={menu} changeTabHandler={changeTab}/>
            {tab === "overview" &&  <TvInfo item={item}/>}
            {tab === "episodes" &&  <Episodes/>}
            {tab === "videos" && <InfoVideo videos={item.videos.results}/>}
            {tab === "photos" && <InfoPhotos image={item.images}/>}
        </>
    );
};

export default TvDetails;