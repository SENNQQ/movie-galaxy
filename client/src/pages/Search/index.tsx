import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Listing from "../../components/Listing";
import {search} from "../../api/zxc";
import {cinemaProps} from "../../types/MainPageTypes";
import {useAppDispatch} from "../../store/hook";
import {closeSearch} from "../../store/search/slice";

type LocationState = {
    query: string | undefined
}

const Search = () => {

    const location = useLocation();
    const [searchItem, setSearchItem] = useState<cinemaProps[]>([]);
    const state = location.state as LocationState
    const dispatch = useAppDispatch();

    const handleCloseSearch = () => {
        dispatch(closeSearch());
    }

    const title = () => {
        return state.query ? `Results For: ${state.query}` : '';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.query) {
                    const items = await search(state.query, 1);
                    return {items}
                } else {
                    console.log("page not found")
                }

            } catch {
                console.log("date not valibale")
            }
        }
        fetchData().then((response) => {
            if (response) {
                setSearchItem(response.items.results)
            }
        })
    }, [state.query]);

    return (
        <div style={{paddingTop:"5em"}}>
            {searchItem && <Listing items={searchItem} title={title()} closeSearch={handleCloseSearch}/> }
        </div>
    );
};

export default Search;