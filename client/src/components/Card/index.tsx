import React, {FC} from 'react';
import {apiImgUrl} from "../../api/zxc";
import st from './card.module.scss'
import {CardPropsType} from "./types";
import cn from "classnames";
import {Link} from "react-router-dom";
import {name, stars} from "../../helper/detailsInfo";

import {cinemaProps} from "../../types/MainPageTypes";
import {rating} from "../../helper/additionalFun";


const Card: FC<CardPropsType> = ({item}) => {

    const poster = (item: cinemaProps): string => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else if (item.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.profile_path}`;
        } else {
            return '';
        }
    };

    const media = () => {
        if (item.media_type) {
            return item.media_type;
        }
        else if (item.name) {
            return 'tv';
        }
        else {
            return 'movie';
        }
    }

    return (
        <>

            <div className={st.card} key={item.id}>
                <Link to={`/${media()}/${item.id}`} className="card__link">
                    <div className={st.card__img}>
                        <img src={poster(item)} alt={item.title}/>
                    </div>
                    <h2 className={st.card__name}> {name(item)} </h2>
                    <div className={cn("rating", st.card__rating)}>
                        <div className={cn("stars", st.card__stars)}>
                            <div style={{width: `${stars(item)}%`}}></div>
                        </div>
                        <div className={cn("vote", st.card__vote)}>{rating(item.vote_average)}</div>
                    </div>
                </Link>
            </div>

        </>
    );
};

export default Card;