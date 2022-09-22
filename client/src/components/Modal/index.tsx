import React, {FC, useEffect, useRef, useState} from 'react';
import st from './modal.module.scss'
import {InfoModalMoviePropsType} from "./types";
import cn from "classnames";
import LoadableImage from "../LoadableImage";

const Modal: FC<InfoModalMoviePropsType> = ({
                                                data,
                                                type = 'image',
                                                startAt = 0,
                                                nav = false,
                                                closeModal,
                                            }) => {

    const [activeItem, setActiveItem] = useState<string>(data[startAt]);
    const [modalStartAt, setModalStartAt] = useState(startAt);

    const modalRef = useRef<HTMLDivElement>(null);

    //Изменение индекса видео в модальном окне на кнопки вперед назад
    const changeSelectIndex = (direction: string) => {
        if (direction === 'prev') {
            let goTo = ((modalStartAt - 1) + data.length) % data.length;
            setModalStartAt(goTo)
        }
        if (direction === 'next') {
            let goTo = (modalStartAt + 1) % data.length;
            setModalStartAt(goTo)
        }
    }

    const close = () => {
        document.body.classList.remove('modal-open');
        closeModal();
    }

    const handleIframeSize = () => {
        if (modalRef.current) {
            const aspectRatio = 16 / 9;
            const styles = getComputedStyle(modalRef.current);

            let maxWidth = modalRef.current.offsetWidth;
            let maxHeight = modalRef.current.offsetHeight;
            let width;
            let height;

            maxWidth -= parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft);
            maxHeight -= parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
            width = maxWidth;
            height = maxHeight;
            if (maxHeight > maxWidth / aspectRatio) {
                height = maxWidth / aspectRatio;
            } else if (maxWidth > maxHeight * aspectRatio) {
                width = maxHeight * aspectRatio;
            }

            (modalRef.current.querySelector(`.${st.modal__iframe}`) as HTMLDivElement).style.width = `${width}px`;
            (modalRef.current.querySelector(`.${st.modal__iframe}`) as HTMLDivElement).style.height = `${height}px`;
        }
    }


    useEffect(() => {
        setActiveItem(data[modalStartAt]);

    }, [modalStartAt, data]);

    useEffect(()=>{
        document.body.classList.add('modal-open');
        if(type === "iframe"){
            handleIframeSize();
        }
    }, [])

    return (
        <div className={st.modal} ref={modalRef}>
            <div className={st.modal__wrap}>
                <div className={st.modal__body}>
                    <button aria-label="Close"
                            type="button"
                            className={st.modal__close}
                            onClick={() => close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10"
                               strokeWidth="1.5">
                                <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
                            </g>
                        </svg>
                    </button>

                    <div className={cn({
                        [st.modal__iframe]:type === "iframe",
                        [st.modal__image]:type === "image",
                    })}>
                        {type === 'iframe' &&
                            <iframe src={activeItem + "?rel=0&showinfo=0&autoplay=1"}
                                    title={"movie page"}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen/>}

                        {type === 'image' && <LoadableImage src={activeItem} />}

                    </div>

                    {nav && <div className={st.modal__nav}>
                        <button aria-label="Previous"
                                type="button"
                                className={cn(st.modal__arrow, st.modal__arrow__prev)}
                                onClick={() => changeSelectIndex('prev')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" strokeMiterlimit="10"
                                      d="M17.9 23.2L6.1 12 17.9.8"></path>
                            </svg>
                        </button>
                        <div className={st.modal__count}>
                            {modalStartAt + 1} / {data.length}
                        </div>
                        <button aria-label="Next"
                                type="button" title="Next"
                                className={cn(st.modal__arrow, st.modal__arrow__next)}
                                onClick={() => changeSelectIndex('next')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" strokeMiterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path>
                            </svg>
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;