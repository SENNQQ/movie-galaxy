import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getListItem, getMovies, getTrending} from "../../../api/zxc";
import {iCategoryOrGenresFetchData} from "../../../types/MainPageTypes";
import Listing from "../../../components/Listing";

const CategoryMovie = () => {

    const params = useParams();
    const [categoryItems, setCategoryItems] = useState<iCategoryOrGenresFetchData>();

    const title = ():string|undefined =>{
      if(params.name){
          return getListItem('movie', params.name)!.title;
      }
    }

    useEffect(()=> {
        if(params.name){
            const fetchData = async () => {
                try {
                    const items = params.name === 'trending' ? await getTrending('movie') : await getMovies(params.name);
                    return { items };
                } catch {
                    console.log("Page not found");
                }
            }
            fetchData().then((response) => {
                if(response){
                    setCategoryItems(response);
                }
            })
        }
    }, []);

    return (
        <div>
            {categoryItems && <Listing items={categoryItems?.items.results} title={title()}/>}
        </div>
    );
};

export default CategoryMovie;