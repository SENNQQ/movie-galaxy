import React, {useState} from 'react';
import NavMovie from "../NavMovie";

import InfoOverview from "../InfoOverview";

const InfoMovie = () => {

    const [tab, setTab] = useState<string>('overview')

    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" && <InfoOverview/>}
            {tab === "video" && <h1>video</h1>}
            {tab === "photo" && <h1>photo</h1>}
        </>
    );
};

export default InfoMovie;