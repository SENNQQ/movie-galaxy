import React, {FC, useState} from 'react';
import st from './panel.module.scss'
import {backdrop, name, stars, trailer, yearStart} from "../../helper/detailsInfo";
import Modal from "../Modal";
import {PanelMoviePropsTypes} from "./types";
import {truncate} from "../../helper/additionalFun";
import {Link} from "react-router-dom";
import LoadableImage from "../LoadableImage";


//TODO сделать получение данных, при клике на кнопку "посмотреть трейлер" открывается модальное окно для просмотра.
const PanelMovie: FC<PanelMoviePropsTypes> = ({
                                                  item,
                                                  type}) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const trailerMovie:string[] | null = (trailer(item));

    const openModel = () => {
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div className={st.hero}>
                <div className={st.backdrop}>
                    <LoadableImage src={backdrop(item) || ""}/>
                </div>
                <div className={st.panel}>
                    <div className={st.panel_container}>
                        <h1 className={st.panel__title}>
                            <Link to={type === 'tv'
                                ? `/tv/${item.id}`
                                : `/movie/${item.id}`}>{name(item)}</Link>
                        </h1>
                        {item.vote_count > 0 && <div className={st.panel__meta}>
                            <div className="rating">
                                <div className="stars">
                                    <div style={{width: `${stars(item)}%`}}></div>
                                </div>
                                {item.vote_count > 0 && <div> {item.vote_count} Reviews</div>}
                            </div>
                            <div className={st.panel__meta__info}>
                                {yearStart(item) && <span> {yearStart(item)} </span>}
                                {item.runtime && <span> {item.runtime} </span>}
                                <span>Cert. TV-MA</span>
                            </div>
                        </div>
                        }
                        <div className={st.panel__desc}>
                            {truncate(item.overview, 199)}
                        </div>
                        {trailerMovie && <button type="button"
                                                 className="button button_icon trailer"
                                                 onClick={()=>openModel()}>
                            <span className="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                    fill="#fff">
                                <path d="M3 22v-20l18 10-18 10z"></path>
                                </svg>
                            </span>
                            <span className="txt">Смотреть трейлер</span>
                        </button>
                        }
                    </div>
                </div>
            </div>
            {modalVisible && trailerMovie!=null && <Modal data={trailerMovie}
                                                          type="iframe"
                                                          closeModal={closeModel}/>}
        </>

    );
};

export default PanelMovie;