import React, {FC, useState} from 'react';
import NavMovie from "../NavMovie";
import InfoOverview from "../InfoOverview";
import InfoVideo from "../InfoVideo";
import InfoPhotos from "../InfoPhotos";
import {MoviePropsTypes} from "../../types/MoviePageTypes";



const MovieGalaxy:FC<MoviePropsTypes> = ({item}) => {

    const [tab, setTab] = useState<string>('overview')

    // const [itemOverview, setItemOverview] = useState<InfoOverviewType>(item)


    // {
    //     budget: item.budget,
    //         credits: {
    //     cast: item.credits.cast,
    //         crew: item.credits.crew
    // },
    //     external_ids: item.external_ids,
    //         genres: item.genres,
    //     original_language: item.original_language,
    //     overview: item.overview,
    //     poster_path: item.poster_path,
    //     production_companies: item.production_companies,
    //     release_date: item.release_date,
    //     revenue: item.revenue,
    //     runtime: item.runtime,
    //     status: item.status
    // }

    const changeTab = (nameTab:string):void =>{
        setTab(nameTab);
    }

    console.log(item);

    return (
        <>
            <NavMovie nameTab={tab} changeTabHandler={changeTab}/>
            {tab === "overview" && <InfoOverview item={item}/>}
            {tab === "videos" && <InfoVideo />}
            {tab === "photos" && <InfoPhotos/>}
        </>
    );
};

export default MovieGalaxy;