import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import {useParams} from "react-router-dom";
import {getListItem, getMovie, getMovies} from "../api/zxc";
import {allPropsMovie} from "../types/MoviePageTypes";
import {PanelMovieTypes} from "../components/PanelMovie/types";
import MovieDetails from "../components/MovieDetails";
import {cinemaProps} from "../types/MainPageTypes";
import Carousel from "../components/Carousel";


const Movie = () => {

    let params = useParams();

    const [DataMovie, setDataMovie] = useState<allPropsMovie>();
    const [PanelDataMovie, setPanelDataMovie] = useState<PanelMovieTypes>();

    useEffect(()=>{
        if(params.id){
            getMovie(params.id).then((response)=> {
                setDataMovie(response);
                setPanelDataMovie(response);
            });
        }

    }, [params.id]);

    const [popular, setPopular] = useState<cinemaProps[]>([]);
    const [topRated , setTopRated ] = useState<cinemaProps[]>([]);
    const [upcoming , setUpcoming ] = useState<cinemaProps[]>([]);
    const [nowPlaying , setNowPlaying ] = useState<cinemaProps[]>([]);

    useEffect(() => {
        if (!params.id){
            const fetchData = async () => {
                const popular = await getMovies('popular');
                const topRated = await getMovies('top_rated');
                const upcoming = await getMovies('upcoming');
                const nowPlaying = await getMovies('now_playing');
                const PanelDataMovie = await getMovies(upcoming.results[0].id);

                return { popular, topRated, upcoming, nowPlaying, PanelDataMovie };
            }
            fetchData().then(response => {
                setPopular(response.popular.results);
                setTopRated(response.topRated.results);
                setUpcoming(response.upcoming.results);
                setNowPlaying(response.nowPlaying.results);
                setPanelDataMovie(response.PanelDataMovie);
            });
        }
    }, [params.id]);


    const  popularUrl  = () => {
        return { name: 'movie/category/popular'};
    };

    const popularTitle  = () => {
        return getListItem('movie', 'popular')!.title;
    };

    const  topRatedTitle  = () => {
        return getListItem('movie', 'top_rated')!.title;
    };

    const topRatedUrl   = () => {
        return { name: 'movie/category/top_rated'};
    };

    const  upcomingTitle   = () => {
        return getListItem('movie', 'upcoming')!.title;
    };

    const upcomingUrl   = () => {
        return { name: 'movie/category/upcoming'};
    };

    const  nowPlayingTitle  = () => {
        return getListItem('movie', 'now_playing')!.title;
    };

    const nowPlayingUrl   = () => {
        return { name: 'movie/category/now_playing'};
    };


    return (
        <>
            <>
                {PanelDataMovie && <PanelMovie item={PanelDataMovie}/>}
            </>
            <>
                {params.id ? DataMovie && <MovieDetails item={DataMovie}/>
                    :
                   <>
                       {popular.length > 0 && <Carousel items={popular}
                                                        title={popularTitle}
                                                        allUrl={popularUrl}/>}

                       {topRated.length > 0 && <Carousel items={topRated}
                                                         title={topRatedTitle}
                                                         allUrl={topRatedUrl}/>}

                       {upcoming.length > 0 && <Carousel items={upcoming}
                                                         title={upcomingTitle}
                                                         allUrl={upcomingUrl}/>}

                       {nowPlaying.length > 0 && <Carousel items={nowPlaying}
                                                           title={nowPlayingTitle}
                                                           allUrl={nowPlayingUrl}/>}
                   </>
                }
            </>
        </>
    )

};

export default Movie;