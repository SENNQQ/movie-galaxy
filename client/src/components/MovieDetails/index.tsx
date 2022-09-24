import React, {FC, useState} from 'react';
import NavMovie from "../NavMovie";
import InfoOverview from "../InfoOverview";
import InfoVideo from "../InfoVideo";
import InfoPhotos from "../InfoPhotos";
import {MoviePropsTypes} from "../../types/MoviePageTypes";



const MovieGalaxy:FC<MoviePropsTypes> = ({item}) => {

    const [tab, setTab] = useState<string>('overview')

    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    const showCredits = () => {
        const credits = item.credits;
        return credits && credits.cast && credits.cast.length;
    }

    const showVideos = () => {
        const videos = item.videos;
        return videos && videos.results && videos.results.length;
    }

    const showImages = () => {
        const images = item.images;
        return images && ((images.backdrops && images.backdrops.length) || (images.posters && images.posters.length));
    }

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" &&  <InfoOverview item={item}/>}
            {tab === "videos" && showVideos() && <InfoVideo videos={item.videos.results}/>}
            {tab === "photos" && showImages() && <InfoPhotos image={item.images}/>}
        </>
    );
};

export default MovieGalaxy;