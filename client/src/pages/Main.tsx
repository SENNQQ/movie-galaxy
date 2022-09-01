import React from 'react';
import PanelMovie from "../components/PanelMovie";
import '../style/Common.scss';
import Carousel from "../components/Carousel";


//TODO запрос данных и передача их в PanelMovie и Carousel
const Main = () => {



    return (
        <>
            <>
                <PanelMovie/>
            </>
            <>
                <Carousel/>
            </>
        </>
    );
};

export default Main;