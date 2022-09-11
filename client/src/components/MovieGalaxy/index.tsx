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

    console.log(item);

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" && <InfoOverview/>}
            {tab === "videos" && <InfoVideo />}
            {tab === "photos" && <InfoPhotos/>}
        </>
    );
};

export default MovieGalaxy;