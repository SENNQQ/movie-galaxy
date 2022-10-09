import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getGenreList, getMediaByGenre} from "../../api/zxc";
import Listing from "../../components/Listing";
import {iGenre, iGenresFetchData} from "./types";


const GenreMovie = () => {

    const params = useParams();

    const [genreMovie, setGenreMovie] = useState<iGenresFetchData>();

    const title = () =>{
        if (genreMovie?.genre) {
            return `Movie Genre: ${genreMovie.genre.name}`;
        }
        else {
            return `Movie Genre`;
        }
    }

    useEffect(()=> {
        if(params.id){
            const fetchData = async () => {
                try {

                    const items = await getMediaByGenre('movie', params.id);
                    const genres:iGenre[] = await getGenreList('movie');
                    const genre = genres.find(genre => genre.id === parseInt(params.id!));
                    if (genre) {
                        return { items, genre };
                    }
                    else {
                        console.log("page not found")
                    }

                }
                catch {
                    console.log("date not valibale")
                }
            }
            fetchData().then((response) => {
                if(response){
                    setGenreMovie({items:response.items, genre:response.genre})
                }
            })
        }
    }, []);


    return (
        <div>
            {genreMovie && <Listing items={genreMovie?.items.results} title={title()}/>}
        </div>
    );
};

export default GenreMovie;