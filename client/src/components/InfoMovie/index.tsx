import React, {useState} from 'react';
import NavMovie from "../NavMovie";

import InfoOverview from "../InfoOverview";
import InfoVideo from "../InfoVideo";
import InfoPhotos from "../InfoPhotos";


const InfoMovie = () => {

    const [tab, setTab] = useState<string>('videos')


    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }



    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" && <InfoOverview/>}
            {tab === "videos" && <InfoVideo />}
            {tab === "photos" && <InfoPhotos/>}
        </>
    );
};

export default InfoMovie;