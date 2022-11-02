import React, {FC} from 'react';
import {apiImgUrl} from "../../api/zxc";
import st from './card.module.scss'
import {CardPropsType} from "./types";
import cn from "classnames";
import {Link} from "react-router-dom";
import {name, stars} from "../../helper/detailsInfo";

import {cinemaProps} from "../../types/MainPageTypes";
import {rating} from "../../helper/additionalFun";

const Card:FC<CardPropsType> = ({
                                     item,
                                     closeSearch}) => {

    const poster = (item: cinemaProps): string | undefined => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else if (item.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.profile_path}`;
        } else {
            return undefined;
        }
    };

    const posterImg = poster(item);

    const media = () => {
        if (item.media_type) {
            return item.media_type;
        } else if (item.name) {
            return 'tv';
        } else {
            return 'movie';
        }
    }

    return (
        <>
            <div className={st.card} key={item.id} onClick={closeSearch ? ()=>closeSearch() : undefined}>
                <Link to={`/${media()}/${item.id}`} className="card__link">
                    <div className={st.card__img}>
                        {posterImg ? <img src={poster(item)} alt={item.title}/>
                            :
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                             width="40" height="40" viewBox="0 0 24 24"
                             fillRule="evenodd" clipRule="evenodd"
                             fill="#999">
                                    <path
                                d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                                </svg>
                            </span>
                        }
                    </div>
                    <h2 className={st.card__name}> {name(item)} </h2>
                    {item.vote_average &&
                        <div className={cn("rating", st.card__rating)}>
                            <div className={cn("stars", st.card__stars)}>
                                <div style={{width: `${stars(item)}%`}}></div>
                            </div>

                            <div className={cn("vote", st.card__vote)}>{rating(item.vote_average)}</div>
                        </div>
                    }
                </Link>
            </div>

        </>
    );
};

export default Card;