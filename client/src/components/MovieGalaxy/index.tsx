import React, {FC, useState} from 'react';
import NavMovie from "../NavMovie";
import InfoOverview from "../InfoOverview";
import InfoVideo from "../InfoVideo";
import InfoPhotos from "../InfoPhotos";
import {MoviePropsTypes} from "../../types/MoviePageTypes";



const MovieGalaxy:FC<MoviePropsTypes> = ({item}) => {

    const [tab, setTab] = useState<string>('overview')

    // const [itemOverview, setItemOverview] = useState<InfoOverviewType>(item)


    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    console.log(item);

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" && <InfoOverview item={item}/>}
            {tab === "videos" && <InfoVideo videos={item.videos.results}/>}
            {tab === "photos" && <InfoPhotos/>}
        </>
    );
};

export default MovieGalaxy;