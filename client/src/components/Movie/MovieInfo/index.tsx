import React, {FC, useEffect, useState} from 'react';
import cn from "classnames";
import st from "./overview.module.scss";
import Carousel from "../../Carousel";
import {GenresType, InfoOverviewPropsType} from "./types";
import {apiImgUrl, getMovieRecommended} from "../../../api/zxc";
import {arrayToList, fullDate, fullLang, numberWithCommas, runtime} from "../../../helper/additionalFun";
import {directors} from "../../../helper/detailsInfo";
import ExternalLinks from "../../ExternalLinks";
import {cinemaProps} from "../../../types/MainPageTypes";
import {castProps} from "../../../types/MoviePageTypes";
import Comments from "../../Comment";
import AddToCatalog from "../../AddToCatalog";

const MovieInfo: FC<InfoOverviewPropsType> = ({item}) => {

    const poster = () => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else {
            return false;
        }
    };

    const posterItem = poster();

    const formatGenres = (genres:GenresType[]) => {
        return genres.map(genre => `<a href="/genre/${genre.id}/movie">${genre.name}</a>`).join(', ');
    };

    const [CarouselCast, setCarouselCast] = useState<[castProps]>(item.credits.cast);
    const [recommendMovie, setRecommendMovie] = useState<cinemaProps[]>([]);

    const showCredits = () => {
        const credits = item.credits;
        return credits && credits.cast && credits.cast.length;
    }

    const  CreditsUrl  = () => {
        return { name: 'person'};
    };

    const  recommendUrl  = () => {
        return { name: 'movie/'};
    };

    useEffect(()=>{
        setCarouselCast(item.credits.cast);
    }, [item.credits.cast, item.id])

    useEffect(()=>{
        const fetchData = async () => {
            const recommend =  await getMovieRecommended(item.id);
            return {recommend}
        }
        fetchData().then(response=>{
            setRecommendMovie(response.recommend.results);
        })

    }, [item.id, recommendMovie.length])


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
                            {item.release_date &&
                                <li>
                                    <div className={st.noList__label}>
                                        Released
                                    </div>
                                    <div className={st.noList__value}>
                                        {fullDate(item.release_date)}
                                    </div>
                                </li>
                            }
                            {item.runtime &&
                                <li>
                                    <div className={st.noList__label}>
                                        Runtime
                                    </div>
                                    <div className={st.noList__value}>
                                        {runtime(item.runtime)}
                                    </div>
                                </li>
                            }
                            {directors(item) &&
                                <li>
                                    <div className={st.noList__label}>
                                        Director
                                    </div>
                                    <div className={st.noList__value}
                                         dangerouslySetInnerHTML={{__html: directors(item)}}>
                                    </div>
                                </li>
                            }
                            {item.budget > 0 &&
                                <li>
                                    <div className={st.noList__label}>
                                        Budget
                                    </div>
                                    <div className={st.noList__value}>
                                        ${numberWithCommas(item.budget)}
                                    </div>
                                </li>
                            }
                            {item.revenue > 0 &&
                                <li>
                                    <div className={st.noList__label}>
                                        Revenue
                                    </div>
                                    <div className={st.noList__value}>
                                        ${numberWithCommas(item.revenue)}
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
                            {item.production_companies.length > 0 &&
                                <li>
                                    <div className={st.noList__label}>
                                        Production
                                    </div>
                                    <div className={st.noList__value}>
                                        {arrayToList(item.production_companies)}
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <AddToCatalog _id={item.id}
                              type={"movie"}
                              img={posterItem ? item.poster_path : undefined}
                              name_mt={item.name || item.title}
                />
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
            {recommendMovie.length > 0 && <Carousel items={recommendMovie} title={"More Like This"} allUrl={recommendUrl}/>}
            <Comments mt_id={item.id} content_name={item.name || item.title} type={"movie"}/>
        </>

    );
};

export default MovieInfo;