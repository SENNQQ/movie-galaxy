import React from 'react';
import tempImage from '../../image/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg';
import st from './carousel.module.scss';
import cn from "classnames";

const Carousel = () => {
    return (
        <>
            <div className={st.listening_head}>
                <h2 className={st.listening_title}>Trending Movies</h2>
                <a className={st.listing_explore}>
                    <strong>Посмотреть все</strong>
                </a>
            </div>
            <div className={st.carousel}>
                <button className={cn(st.carousel_nav, st.carousel_nav__left)} disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" strokeMiterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path>
                    </svg>
                </button>

                <div className={st.carousel__items}>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <img src={tempImage} alt="Prey"/>
                            </div>
                            <h2 className={st.card__name}> Prey </h2>
                            <div className={cn("rating", st.card__rating)}>
                                <div className={cn("stars", st.card__stars)}>
                                    <div style={{width:"82%"}}></div>
                                </div>
                                <div className={cn("vote", st.card__vote)}> 8.096 </div>
                            </div>

                        </a>
                    </div>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <span>Explore All</span>
                            </div>
                        </a>
                    </div>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <img src={tempImage} alt="Prey"/>
                            </div>
                            <h2 className={st.card__name}> Prey </h2>
                            <div className={cn("rating", st.card__rating)}>
                                <div className={cn("stars", st.card__stars)}>
                                    <div style={{width:"82%"}}></div>
                                </div>
                                <div className={cn("vote", st.card__vote)}> 8.096 </div>
                            </div>

                        </a>
                    </div>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <img src={tempImage} alt="Prey"/>
                            </div>
                            <h2 className={st.card__name}> Prey </h2>
                            <div className={cn("rating", st.card__rating)}>
                                <div className={cn("stars", st.card__stars)}>
                                    <div style={{width:"82%"}}></div>
                                </div>
                                <div className={cn("vote", st.card__vote)}> 8.096 </div>
                            </div>

                        </a>
                    </div>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <img src={tempImage} alt="Prey"/>
                            </div>
                            <h2 className={st.card__name}> Prey </h2>
                            <div className={cn("rating", st.card__rating)}>
                                <div className={cn("stars", st.card__stars)}>
                                    <div style={{width:"82%"}}></div>
                                </div>
                                <div className={cn("vote", st.card__vote)}> 8.096 </div>
                            </div>

                        </a>
                    </div>
                    <div className={st.card}>
                        <a href="" className="card__link">
                            <div className={st.card__img}>
                                <img src={tempImage} alt="Prey"/>
                            </div>
                            <h2 className={st.card__name}> Prey </h2>
                            <div className={cn("rating", st.card__rating)}>
                                <div className={cn("stars", st.card__stars)}>
                                    <div style={{width:"82%"}}></div>
                                </div>
                                <div className={cn("vote", st.card__vote)}> 8.096 </div>
                            </div>

                        </a>
                    </div>



                </div>

                <button className={cn(st.carousel_nav, st.carousel_nav__right)} disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" strokeMiterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path>
                    </svg>
                </button>

            </div>
        </>
    );
};

export default Carousel;