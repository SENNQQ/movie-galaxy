import React, {FC} from 'react';
import {apiImgUrl} from "../../api/zxc";
import st from './card.module.scss'
import {CardCarouselPropsType} from "./types";
import cn from "classnames";
import {Link} from "react-router-dom";
import {name} from "../../helper/detailsInfo";
import {combinedCreditsCast} from "../../types/MoviePageTypes";


const CardCarousel: FC<CardCarouselPropsType> = ({item}) => {

    const poster = (item: combinedCreditsCast): string => {
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

            <div className={st.card} key={item.id}>
                <Link to={`/${item.media_type}/${item.id}`} className="card__link">
                    <div className={st.card__img}>
                        <img src={poster(item)} alt={item.title}/>
                    </div>
                    <h2 className={st.card__name}> {name(item)} </h2>
                    <div className={cn("rating", st.card__rating)}>
                        <div className={cn("stars", st.card__stars)}>
                            <div style={{width: `${item.vote_average * 10}%`}}></div>
                        </div>
                        <div className={cn("vote", st.card__vote)}>{item.vote_count}</div>
                    </div>
                </Link>
            </div>

        </>
    );
};

export default CardCarousel;