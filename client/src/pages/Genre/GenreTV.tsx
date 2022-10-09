import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getGenreList, getMediaByGenre} from "../../api/zxc";
import Listing from "../../components/Listing";
import {iGenre, iGenresFetchData} from "./types";

const GenreTV = () => {
    const params = useParams();

    const [genreTV, setGenreTV] = useState<iGenresFetchData>();

    const title = () =>{
        if (genreTV?.genre) {
            return `TV Genre: ${genreTV.genre.name}`;
        }
        else {
            return `TV Genre`;
        }
    }

    useEffect(()=> {
        if(params.id){
            const fetchData = async () => {
                try {

                    const items = await getMediaByGenre('tv', params.id);
                    const genres:iGenre[] = await getGenreList('tv');
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
                    setGenreTV({items:response.items, genre:response.genre})
                }
            })
        }
    }, []);


    return (
        <div>
            {genreTV && <Listing items={genreTV?.items.results} title={title()}/>}
        </div>
    );
};

export default GenreTV;