import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import {useParams} from "react-router-dom";
import {getMovie} from "../api/zxc";
import {allPropsMovie} from "../types/MoviePageTypes";
import {PanelMovieTypes} from "../components/PanelMovie/types";
import MovieGalaxy from "../components/MovieGalaxy";


const Movie = () => {

    let params = useParams();

    const [DataMovie, setDataMovie] = useState<allPropsMovie>();
    const [PanelDataMovie, setPanelDataMovie] = useState<PanelMovieTypes>();

    useEffect(()=>{
        getMovie(params.id).then((response)=> {
            setDataMovie(response);
            setPanelDataMovie(response);
        });
    }, [params.id]);

    return (
        <>
            <div>
                {PanelDataMovie && <PanelMovie item={PanelDataMovie}/>}
            </div>
            <div>
                {DataMovie && <MovieGalaxy item={DataMovie}/>}
            </div>
        </>
    )

};

export default Movie;