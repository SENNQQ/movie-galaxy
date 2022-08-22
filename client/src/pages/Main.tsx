import React from 'react';
import PanelMovie from "../components/PanelMovie";
import '../style/Common.scss';
import Carousel from "../components/Carousel";

const Main = () => {



    return (
        <>
            <div>
                <PanelMovie/>
            </div>
            <div className="listing listing_carousel">
                <Carousel/>
            </div>
        </>
    );
};

export default Main;