import React, {useEffect, useRef, useState} from 'react';
import tempImage from '../../image/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg';
import st from './carousel.module.scss';
import cn from "classnames";
import {CarouselPropsType} from "./types";

//Todo сделать тайтл пропсом, передавать его. Сделать передачу данных фильма.
const Carousel = () => {

    const carouselRef = useRef<HTMLDivElement>(null);

    const [paramCarousel, setParamCarousel] = useState<CarouselPropsType>({
        carouselWidth: 0,
        disableLeftButton: true,
        disableRightButton: false,
        elementWidth: 0,
        maximumPosition: 0,
        unusableVisibleWidth: 0,
        visibleWidth: 0
    });

    const moveToClickEvent = (direction: string): void => {
        const invisible = carouselRef.current!.scrollLeft +
            + (direction === 'left' ? - paramCarousel.visibleWidth + 1 : paramCarousel.visibleWidth);
        const remainder = invisible - invisible % paramCarousel.elementWidth;
        moveTo(remainder);
    }

    const moveTo = (width: number) => {
        carouselRef.current!.scrollTo({
            left: width,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        let unusableVisibleWidth = 72;
        let numberOfItems = 12;//Количество фильмов в данных
        const elementWidth = carouselRef.current!.children[0].getBoundingClientRect().width;
        const carouselWidth = numberOfItems * elementWidth;
        const maximumPosition = carouselRef.current!.scrollWidth;

        if (window.innerWidth >= 1200) {
            unusableVisibleWidth = 92;
        }

        const visibleWidth = carouselRef.current!.offsetWidth - unusableVisibleWidth;

        let disableLeftButton = !carouselRef.current!.scrollLeft;
        let disableRightButton = visibleWidth >= carouselWidth;

        setParamCarousel({
            carouselWidth: carouselWidth,
            disableLeftButton: disableLeftButton,
            disableRightButton: disableRightButton,
            elementWidth: elementWidth,
            maximumPosition: maximumPosition,
            unusableVisibleWidth: unusableVisibleWidth,
            visibleWidth: visibleWidth
        })

    }, []);


    const scrollEvent = () => {
        const scrollLeft = carouselRef.current!.scrollLeft;
        const end = paramCarousel.maximumPosition - paramCarousel.visibleWidth - paramCarousel.elementWidth;

        let leftBtn = 3 > scrollLeft;
        let rightBtn = scrollLeft > end;

        setParamCarousel({
            ...paramCarousel,
            disableRightButton: rightBtn,
            disableLeftButton: leftBtn
        });
    };

    return (
        <div className="listing listing_carousel">
            <div className={st.listening_head}>
                    <h2 className={st.listening_title}>Trending Movies</h2>
                    <a className={st.listing_explore}>
                        <strong>Посмотреть все</strong>
                    </a>
                </div>
            <div className={st.carousel}>
                    <button aria-label="Previous"
                            className={cn(st.carousel_nav, st.carousel_nav__left)}
                            type="button"
                            disabled={paramCarousel.disableLeftButton}
                            onClick={() => moveToClickEvent('left')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" strokeMiterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path>
                        </svg>
                    </button>

                    <div className={st.carousel__items}
                         ref={carouselRef}
                         onScroll={scrollEvent}>
                        <div className={st.card}>
                            <a href="" className="card__link">
                                <div className={st.card__img}>
                                    <img src={tempImage} alt="Prey"/>
                                </div>
                                <h2 className={st.card__name}> Prey </h2>
                                <div className={cn("rating", st.card__rating)}>
                                    <div className={cn("stars", st.card__stars)}>
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
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
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
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
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
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
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
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
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
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
                                        <div style={{width: "82%"}}></div>
                                    </div>
                                    <div className={cn("vote", st.card__vote)}> 8.096</div>
                                </div>

                            </a>
                        </div>


                    </div>

                    <button aria-label="Next"
                            className={cn(st.carousel_nav, st.carousel_nav__right)}
                            type="button"
                            disabled={paramCarousel.disableRightButton}
                            onClick={() => moveToClickEvent('right')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" strokeMiterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path>
                        </svg>
                    </button>

                </div>
        </div>
    );
};

export default Carousel;