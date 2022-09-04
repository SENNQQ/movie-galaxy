import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import '../style/Common.scss';
import Carousel from "../components/Carousel";
import {getMovie, getTrending, getTvShow} from "../api/zxc";
import {trendingMoviesTypes, trendingTVTypes} from "../types/MainPageTypes";


//TODO запрос данных и передача их в PanelMovie и Carousel
const Main = () => {

    const [trendingMovies, setTrendingMovies] = useState<trendingMoviesTypes>();
    const [trendingTV, setTrendingTV] = useState<trendingTVTypes>();
    const [featured, setFeatured] = useState<trendingMoviesTypes | trendingTVTypes>();

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
            setTrendingMovies(response.trendingMovies);
            setTrendingTV(response.trendingTV);
            setFeatured(response.featured);
        });
    }, []);


    return (
        <>
            <>
                <PanelMovie/>
            </>
            <>
                <Carousel/>
                <Carousel/>
            </>
        </>
    );
};

export default Main;