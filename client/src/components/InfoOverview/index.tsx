import React from 'react';
import cn from "classnames";
import st from "./overview.module.scss";
import prey from "../../image/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg";
import Carousel from "../Carousel";

const InfoOverview = () => {
    return (
        <>
            <div className={cn(st.info, st.spacing)}>
                <div className={st.info__leftBlock}>
                    <div className={st.posterMovie}>
                        <img src={prey} alt="Prey"/>
                    </div>
                </div>
                <div className={st.info__rightBlock}>
                    <div className={st.rightBlock__overview}>
                        <h2 className={st.rightBlock__title}>
                            Storyline
                        </h2>
                        <div>
                            After more than thirty years of service as one of the Navy’s top aviators, and dodging the
                            advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training
                            a detachment of TOP GUN graduates for a specialized mission the likes of which no living
                            pilot has ever seen.
                        </div>
                    </div>
                    <div className={st.stats}>
                        <ul className="noList">
                            <li>
                                <div className={st.noList__label}>
                                    Released
                                </div>
                                <div className={st.noList__value}>
                                    24 May 2022
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Runtime
                                </div>
                                <div className={st.noList__value}>
                                    2h 11min
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Director
                                </div>
                                <div className={st.noList__value}>
                                    <a >Joseph Kosinski</a>
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Budget
                                </div>
                                <div className={st.noList__value}>
                                    $170,000,000
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Revenue
                                </div>
                                <div className={st.noList__value}>
                                    $1,403,438,969
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Genre
                                </div>
                                <div className={st.noList__value}>
                                    <a>Action</a>,
                                    <a>Drama</a>
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Status
                                </div>
                                <div className={st.noList__value}>
                                    Released
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Language
                                </div>
                                <div className={st.noList__value}>
                                    English
                                </div>
                            </li>
                            <li>
                                <div className={st.noList__label}>
                                    Production
                                </div>
                                <div className={st.noList__value}>
                                    Paramount, Don Simpson/Jerry Bruckheimer Films, Skydance Media
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Carousel/>
            <Carousel/>
        </>

    );
};

export default InfoOverview;