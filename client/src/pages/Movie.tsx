import React from 'react';
import PanelMovie from "../components/PanelMovie";
import InfoMovie from "../components/InfoMovie";


const Movie = () => {
    return (
        <>
            <div>
                <PanelMovie/>
            </div>
            <div>
                <InfoMovie/>
            </div>
        </>
    )

};

export default Movie;