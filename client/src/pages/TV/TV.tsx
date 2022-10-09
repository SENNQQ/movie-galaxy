import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {PanelMovieTypes} from "../../components/PanelMovie/types";
import {getListItem, getTvShow, getTvShows} from "../../api/zxc";
import {cinemaProps} from "../../types/MainPageTypes";
import PanelMovie from "../../components/PanelMovie";
import Carousel from "../../components/Carousel";
import {TvAllPropsType} from "../../types/TvShowPageTypes";
import TvDetails from "../../components/TvDetails";

const TV = () => {

    let params = useParams();

    const [TvShow, setTvShow] = useState<TvAllPropsType>();

    const [PanelDataMovie, setPanelDataMovie] = useState<PanelMovieTypes>();

    useEffect(()=>{
        if(params.id){
            getTvShow(params.id).then((response)=> {
                setTvShow(response);
                setPanelDataMovie(response);
            });
        }

    }, [params.id]);

    const [popular, setPopular] = useState<cinemaProps[]>([]);
    const [topRated , setTopRated ] = useState<cinemaProps[]>([]);
    const [onAir , setOnAir ] = useState<cinemaProps[]>([]);
    const [airingToday , setAiringToday ] = useState<cinemaProps[]>([]);

    useEffect(() => {
        if (!params.id){
            const fetchData = async () => {
                const popular = await getTvShows('popular');
                const topRated = await getTvShows('top_rated');
                const onAir = await getTvShows('on_the_air');
                const airingToday = await getTvShows('airing_today');
                const PanelDataMovie = await getTvShow(popular.results[0].id);

                return { popular, topRated, onAir, airingToday, PanelDataMovie };
            }
            fetchData().then(response => {
                setPopular(response.popular.results);
                setTopRated(response.topRated.results);
                setOnAir(response.onAir.results);
                setAiringToday(response.airingToday.results);

                setPanelDataMovie(response.PanelDataMovie);
            });
        }
    }, [params.id]);


    const  popularUrl  = () => {
        return { name: 'tv/category/popular'};
    };

    const popularTitle  = () => {
        return getListItem('tv', 'popular')!.title;
    };

    const  topRatedTitle  = () => {
        return getListItem('tv', 'top_rated')!.title;
    };

    const topRatedUrl   = () => {
        return { name: 'tv/category/top_rated'};
    };

    const  onAirTitle    = () => {
        return getListItem('tv', 'on_the_air')!.title;
    };

    const onAirUrl    = () => {
        return { name: 'tv/category/on_the_air'};
    };

    const  airingTodayTitle   = () => {
        return getListItem('tv', 'airing_today')!.title;
    };

    const airingTodayUrl    = () => {
        return { name: 'tv/category/airing_today'};
    };

    return (
        <>
            <>
                {PanelDataMovie && <PanelMovie item={PanelDataMovie}/>}
            </>
            <>
                {params.id ? TvShow && <TvDetails item={TvShow}/>
                    :
                    <>
                        {popular.length > 0 && <Carousel items={popular}
                                                         title={popularTitle}
                                                         allUrl={popularUrl}/>}

                        {topRated.length > 0 && <Carousel items={topRated}
                                                          title={topRatedTitle}
                                                          allUrl={topRatedUrl}/>}

                        {onAir.length > 0 && <Carousel items={onAir}
                                                          title={onAirTitle}
                                                          allUrl={onAirUrl}/>}

                        {airingToday.length > 0 && <Carousel items={airingToday}
                                                            title={airingTodayTitle}
                                                            allUrl={airingTodayUrl}/>}
                    </>
                }
            </>
        </>
    );
};

export default TV;