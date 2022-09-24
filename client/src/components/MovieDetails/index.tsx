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

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab} videos={item.videos} images={item.images}/>
            {tab === "overview" &&  <InfoOverview item={item}/>}
            {tab === "videos" && <InfoVideo videos={item.videos.results}/>}
            {tab === "photos" && <InfoPhotos image={item.images}/>}
        </>
    );
};

export default MovieGalaxy;