import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import MovieGalaxy from "../components/MovieGalaxy";
import {useParams} from "react-router-dom";
import {getMovie} from "../api/zxc";
import {cinemaProps} from "../types/MainPageTypes";
import {MoviePropsTypes} from "../types/MoviePageTypes";


const Movie = () => {

    let params = useParams();

    const [DataMovie, setDataMovie] = useState<MoviePropsTypes>();

    useEffect(()=>{
        getMovie(params.id).then((response)=> {
            setDataMovie(response);
        });
    }, [params.id])


    return (
        <>
            <div>
                {/*{DataMovie && <PanelMovie item={DataMovie}/>}*/}
            </div>
            <div>
                {/*{DataMovie && <MovieGalaxy item={DataMovie}/>}*/}
            </div>
        </>
    )

};

export default Movie;