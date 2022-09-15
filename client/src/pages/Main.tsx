import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import '../style/Common.scss';
import Carousel from "../components/Carousel";
import {getListItem, getMovie, getTrending, getTvShow} from "../api/zxc";
import {cinemaProps} from "../types/MainPageTypes";
import {PanelMovieTypes} from "../components/PanelMovie/types";
// import {trendingMoviesTypes, trendingTVTypes} from "../types/MainPageTypes";


//TODO запрос данных и передача их в PanelMovie и Carousel
const Main = () => {

    const [trendingMovies, setTrendingMovies] = useState<cinemaProps[]>([]);
    const [trendingTV, setTrendingTV] = useState<cinemaProps[]>([]);
    const [featured, setFeatured] = useState<PanelMovieTypes>();

    useEffect(() => {
        const fetchData = async () => {
            const trendingMovies = await getTrending('movie');
            const trendingTV = await getTrending('tv');
            let featured;

            const items = [...trendingMovies.results, ...trendingTV.results];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            const media = randomItem.title ? 'movie' : 'tv';
            if (media === 'movie') {
                featured = await getMovie(randomItem.id);
            } else {
                featured = await getTvShow(randomItem.id);
            }
            return {trendingMovies, trendingTV, featured}
        }
        fetchData().then(response => {
            setTrendingMovies(response.trendingMovies.results);
            setTrendingTV(response.trendingTV.results);
            setFeatured(response.featured);
        });
    }, []);


    const  trendingMoviesUrl = () => {
        return { name: 'movie/category/trending'};
    };

    const trendingMoviesTitle = () => {
        return getListItem('movie', 'trending')!.title;
    };

    const  trendingTVUrl = () => {
        return { name: 'movie/category/trending'};
    };

    const trendingTVTitle = () => {
        return getListItem('tv', 'trending')!.title;
    };

    return (
        <>
            <>
                {featured && <PanelMovie item={featured}/>}
            </>
            <>
                {trendingMovies.length > 0 && <Carousel items={trendingMovies}
                                                        title={trendingMoviesTitle}
                                                        allUrl={trendingMoviesUrl}/>}
                {trendingTV.length > 0 && <Carousel items={trendingTV}
                                                    title={trendingTVTitle}
                                                    allUrl={trendingTVUrl}/>}
            </>
        </>
    );
};

export default Main;