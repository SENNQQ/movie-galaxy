import React, {FC, useEffect, useState} from 'react';
import {apiImgUrl, getTvShowRecommended} from "../../../api/zxc";
import {GenresType} from "../../Movie/MovieInfo/types";
import {castProps} from "../../../types/MoviePageTypes";
import {cinemaProps} from "../../../types/MainPageTypes";
import cn from "classnames";
import st from "../../Movie/MovieInfo/overview.module.scss";
import {arrayToList, fullDate, fullLang} from "../../../helper/additionalFun";
import ExternalLinks from "../../ExternalLinks";
import Carousel from "../../Carousel";
import {TvInfoPropsType} from "./types";

const TvInfo:FC<TvInfoPropsType> = ({item}) => {

    const poster = () => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else {
            return false;
        }
    };

    const posterItem = poster();

    const formatGenres = (genres:GenresType[]) => {
        return genres.map(genre => `<a href="/genre/${genre.id}/tv">${genre.name}</a>`).join(', ');
    };

    const formatRunTime = (times:number[]) => {
        return times.map(time => `${time}m`).join(', ');
    };


    const [CarouselCast, setCarouselCast] = useState<[castProps]>(item.credits.cast);

    const [recommendTv, setRecommendTv] = useState<cinemaProps[]>();

    const showCredits = () => {
        const credits = item.credits;
        return credits && credits.cast && credits.cast.length;
    }

    const  CreditsUrl  = () => {
        return { name: 'person'};
    };

    const  recommendUrl  = () => {
        return { name: 'tv/'};
    };

    useEffect(()=>{
        setCarouselCast(item.credits.cast);
    }, [item.credits.cast, item.id])

    useEffect(()=>{
        if(!recommendTv){
            const fetchData = async () => {
                const recommend =  await getTvShowRecommended(item.id);
                return {recommend}
            }
            fetchData().then(response=>{
                setRecommendTv(response.recommend.results);
            })
        }

    }, [item.id, recommendTv])

    console.log(item);

    return (
        <>
            <div className={cn(st.info, "spacing")}>
                <div className={st.info__leftBlock}>
                    <div className={st.posterMovie}>
                        {posterItem ? <img src={posterItem} alt={item.name}/> :
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                     fillRule="evenodd" clipRule="evenodd" fill="#999">
                                    <path
                                        d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                                </svg>
                            </span>
                        }
                    </div>
                </div>
                <div className={st.info__rightBlock}>
                    <div className={st.rightBlock__overview}>
                        <h2 className={st.rightBlock__title}>
                            Storyline
                        </h2>
                        <div>
                            {item.overview}
                        </div>
                    </div>
                    <div className={st.stats}>
                        <ul className="noList">
                            {item.first_air_date &&
                                <li>
                                    <div className={st.noList__label}>
                                        First Aired
                                    </div>
                                    <div className={st.noList__value}>
                                        {fullDate(item.first_air_date)}
                                    </div>
                                </li>
                            }
                            {item.last_air_date &&
                                <li>
                                    <div className={st.noList__label}>
                                        Last Aired
                                    </div>
                                    <div className={st.noList__value}>
                                        {fullDate(item.last_air_date)}
                                    </div>
                                </li>
                            }
                            {item.episode_run_time && item.episode_run_time.length > 0 &&
                                <li>
                                    <div className={st.noList__label}>
                                        Runtime
                                    </div>
                                    <div className={st.noList__value}>
                                        {formatRunTime(item.episode_run_time)}
                                    </div>
                                </li>
                            }
                            {item.genres && item.genres.length &&
                                <li>
                                    <div className={st.noList__label}>
                                        Genre
                                    </div>
                                    <div className={st.noList__value}
                                         dangerouslySetInnerHTML={{__html:formatGenres(item.genres)}}>
                                    </div>
                                </li>
                            }
                            {item.number_of_seasons &&
                                <li>
                                    <div className={st.noList__label}>
                                        Seasons
                                    </div>
                                    <div className={st.noList__value}>
                                        {item.number_of_seasons}
                                    </div>
                                </li>
                            }
                            {item.number_of_episodes &&
                                <li>
                                    <div className={st.noList__label}>
                                        Episodes
                                    </div>
                                    <div className={st.noList__value}>
                                        {item.number_of_episodes}
                                    </div>
                                </li>
                            }
                            {item.status &&
                                <li>
                                    <div className={st.noList__label}>
                                        Status
                                    </div>
                                    <div className={st.noList__value}>
                                        {item.status}
                                    </div>
                                </li>
                            }
                            {item.original_language &&
                                <li>
                                    <div className={st.noList__label}>
                                        Language
                                    </div>
                                    <div className={st.noList__value}>
                                        {fullLang(item.original_language)}
                                    </div>
                                </li>
                            }
                            {item.networks && item.networks.length > 0 &&
                                <li>
                                    <div className={st.noList__label}>
                                        Network
                                    </div>
                                    <div className={st.noList__value}>
                                        {arrayToList(item.networks)}
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                {(item.external_ids.facebook_id
                        || item.external_ids.imdb_id
                        || item.external_ids.instagram_id
                        || item.external_ids.twitter_id)  &&
                    <div className={st.externalLinks}>
                        <ExternalLinks links={item.external_ids}/>
                    </div>
                }
            </div>
            {showCredits() > 0 && <Carousel items={CarouselCast} title={"Cast"} allUrl={CreditsUrl}/>}
            {recommendTv && <Carousel items={recommendTv} title={"More Like This"} allUrl={recommendUrl}/>}
        </>
    );
};

export default TvInfo;