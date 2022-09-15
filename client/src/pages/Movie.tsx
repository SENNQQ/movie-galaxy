import React, {useEffect, useState} from 'react';
import PanelMovie from "../components/PanelMovie";
import MovieGalaxy from "../components/MovieGalaxy";
import {useParams} from "react-router-dom";
import {getMovie} from "../api/zxc";
import {cinemaProps} from "../types/MainPageTypes";
import {MoviePropsTypes} from "../types/MoviePageTypes";
import {PanelMovieTypes} from "../components/PanelMovie/types";


const Movie = () => {

    let params = useParams();

    const [DataMovie, setDataMovie] = useState<MoviePropsTypes>();
    const [PanelDataMovie, setPanelDataMovie] = useState<PanelMovieTypes>();

    useEffect(()=>{
        getMovie(params.id).then((response)=> {
            setDataMovie(response);
            setPanelDataMovie({
                "backdrop_path": response.backdrop_path,
                "title":response.title,
                "name":response.name,
                "vote_count":response.vote_count,
                "vote_average":response.vote_average,
                "runtime":response.runtime,
                "release_date":response.release_date,
                "first_air_date":response.first_air_date,
                "overview":response.overview,
            })
        });
    }, [params.id]);

    console.log(DataMovie);
    console.log(PanelDataMovie);

    return (
        <>
            <div>
                {PanelDataMovie && <PanelMovie item={PanelDataMovie}/>}
            </div>
            <div>
                {/*{DataMovie && <MovieGalaxy item={DataMovie}/>}*/}
            </div>
        </>
    )

};

export default Movie;