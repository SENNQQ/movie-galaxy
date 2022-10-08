import React, {FC, useEffect, useRef, useState} from 'react';
import st from './carousel.module.scss';
import cn from "classnames";
import {CarouselPropsType, CarouselType} from "./types";
import {apiImgUrl} from "../../api/zxc";
import {cinemaProps} from "../../types/MainPageTypes";
import {Link} from "react-router-dom";
import "../../mixins/Carousel.js";
import {castProps} from "../../types/MoviePageTypes";
import {rating} from "../../helper/additionalFun";


const Carousel: FC<CarouselPropsType> = ({
                                             items,
                                             title,
                                             allUrl
                                         }) => {

    const carouselRef = useRef<HTMLDivElement>(null);

    const isTypePeopleProps =
        (props: any[]): props is [castProps] => props.every(item => {
            return 'cast_id' in item
        });

    const isTypeTitleString = (props: (() => string) | string): props is string => {
        return typeof props === 'string'
    };

    const [paramCarousel, setParamCarousel] = useState<CarouselType>({
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
            +(direction === 'left' ? -paramCarousel.visibleWidth + 1 : paramCarousel.visibleWidth);
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
        let numberOfItems = items.length;//Количество фильмов в данных
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

    }, [items]);


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

    const poster = (item: cinemaProps): string => {
        if (item.poster_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.poster_path}`;
        } else if (item.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item.profile_path}`;
        } else {
            return '';
        }
    };

    const posterCast = (person: castProps) => {
        if (person.profile_path) {
            return `${apiImgUrl}/w370_and_h556_bestv2${person.profile_path}`;
        } else {
            return '';
        }
    }

    return (
        <div className="listing listing_carousel">
            <div className={st.listening_head}>
                <h2 className={st.listening_title}>{isTypeTitleString(title) ? title : title()}</h2>
                {
                    !isTypePeopleProps(items) && <Link to={`/${allUrl().name}`} className={st.listing_explore}>
                        <strong>Посмотреть все</strong>
                    </Link>
                }
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

                    {!isTypePeopleProps(items) ? items.map((item) => (
                            <div className={st.card} key={item.id}>
                                <Link to={`/${allUrl().name.split('/')[0]}/${item.id}`} className="card__link">
                                    <div className={st.card__img}>
                                        {item.poster_path === null ?
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" fill="#999">
                                                <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"></path>
                                                </svg>
                                            </span>
                                            : <img src={poster(item)} alt={item.title} loading="lazy"/>
                                        }
                                    </div>
                                    <h2 className={st.card__name}> {item.original_name || item.original_title} </h2>
                                    {item.vote_average > 0 &&
                                        <div className={cn("rating", st.card__rating)}>
                                        <div className={cn("stars", st.card__stars)}>
                                            <div style={{width: `${item.vote_average * 10}%`}}></div>
                                        </div>
                                        <div className={cn("vote", st.card__vote)}>{rating(item.vote_average)}</div>
                                    </div>
                                    }
                                </Link>
                            </div>
                        ))
                        :
                        items.map((item) => (
                            <div className={st.card} key={item.id}>
                                <Link to={`/${allUrl().name}/${item.id}`} className="card__link">
                                    <div className={st.card__img}>
                                        {item.profile_path === null  ?
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" fill="#999">
                                                <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"></path>
                                                </svg>
                                            </span>
                                            : <img src={posterCast(item)} alt={item.name} loading="lazy"/>
                                        }
                                    </div>
                                    <h2 className={st.card__name}> {item.original_name || item.name} </h2>
                                    <div className={st.card__character}>{item.character}</div>
                                </Link>
                            </div>
                        ))
                    }

                    <div className={st.card}>
                        <Link to={allUrl().name} className="card__link">
                            <div className={st.card__img}>
                                <span>Explore All</span>
                            </div>
                        </Link>
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