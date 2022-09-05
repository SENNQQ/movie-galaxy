import React, {FC} from 'react';
import {cinemaProps} from "../../types/MainPageTypes";
import {apiImgUrl} from "../../api/zxc";

//Todo подумать нужна ли отдельная карточка на карусель, вроде ничего с ней нельзя будет сделать.
const CardCarousel:FC<{items: cinemaProps[]}> = ({items}) => {

    const poster  = (item:cinemaProps):string => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else if (item.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.profile_path}`;
        } else {
            return '';
        }
    };

    return (
        <>
            {/*{items.map((item)=> (*/}
            {/*    <div className={st.card} key={item.id}>*/}
            {/*        <a href="" className="card__link">*/}
            {/*            <div className={st.card__img}>*/}
            {/*                <img src={poster(item)} alt={item.title}/>*/}
            {/*            </div>*/}
            {/*            <h2 className={st.card__name}> {item.original_name} </h2>*/}
            {/*            <div className={cn("rating", st.card__rating)}>*/}
            {/*                <div className={cn("stars", st.card__stars)}>*/}
            {/*                    <div style={{width: `${item.vote_average*10}%`}}></div>*/}
            {/*                </div>*/}
            {/*                <div className={cn("vote", st.card__vote)}>{item.vote_count}</div>*/}
            {/*            </div>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*))}*/}
        </>
    );
};

export default CardCarousel;