import React, {FC, useEffect, useState} from 'react';
import st from './modal.module.scss'
import {InfoModalMoviePropsType} from "./types";
import {movieDataType} from "../VideoItem/types";
import cn from "classnames";

const Modal: FC<InfoModalMoviePropsType> = ({
                                                data,
                                                type,
                                                selectIndex,
                                                closeModal,
                                                changeSelectIndex,
                                            }) => {

    if(type === 'iframe'){

    }

    const [activeItem, setActiveItem] = useState<string>();

    useEffect(() => {
        setActiveItem(data[selectIndex]);
    }, [selectIndex, data]);


    return (
        <div className={st.modal}>
            <div className={st.modal__wrap}>
                <div className={st.modal__body}>
                    <button aria-label="Close"
                            type="button"
                            className={st.modal__close}
                            onClick={() => closeModal()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10"
                               strokeWidth="1.5">
                                <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
                            </g>
                        </svg>
                    </button>

                    <div className={st.modal__iframe} style={{"width": "1175px", "height": "661px"}}>


                        {type === 'iframe' &&
                            <iframe src={activeItem + "?rel=0&showinfo=0&autoplay=1"}
                                    title={"movie page"}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen/>}

                        {type === 'image' && <img src={activeItem} alt=""/>}

                    </div>

                    <div className={st.modal__nav}>
                        <button aria-label="Previous"
                                type="button"
                                className={cn(st.modal__arrow, st.modal__arrow__prev)}
                                onClick={() => changeSelectIndex('prev')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" strokeMiterlimit="10"
                                      d="M17.9 23.2L6.1 12 17.9.8"></path>
                            </svg>
                        </button>
                        <div className={st.modal__count}>
                            {selectIndex + 1} / {data.length}
                        </div>
                        <button aria-label="Next"
                                type="button" title="Next"
                                className={cn(st.modal__arrow, st.modal__arrow__next)}
                                onClick={() => changeSelectIndex('next')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" strokeMiterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;