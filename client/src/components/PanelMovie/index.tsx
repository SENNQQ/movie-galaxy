import React, {FC, useState} from 'react';
import st from './panel.module.scss'
import {backdrop, name, stars, yearStart} from "../../helper/detailsInfo";
import Modal from "../Modal";
import {movieDataType} from "../VideoItem/types";
import {PanelMoviePropsTypes} from "./types";


//TODO сделать получение данных, при клике на кнопку "посмотреть трейлер" открывается модальное окно для просмотра.
const PanelMovie:FC<PanelMoviePropsTypes> = ({item}) => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);


    const [activeVideos, setActiveVideos] = useState<movieDataType>()

    const openModel = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, indexVideo: number) => {
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div className={st.hero}>
                <div className={st.backdrop}>
                    <img src={backdrop(item)} alt="spider"/>
                </div>
                <div className={st.panel}>
                    <div className={st.panel_container}>
                        <h1 className={st.panel__title}>
                            <a>{name(item)}</a>
                        </h1>
                        <div className={st.panel__meta}>
                            {item.vote_count && <>
                                <div className="rating">
                                    <div className="stars">
                                        <div style={{width:`${stars(item)}%`}}></div>
                                    </div>
                                    {item.vote_count > 0  && <div> {item.vote_count} Reviews</div> }
                                </div>
                                <div className={st.panel__meta__info}>
                                    {yearStart(item) &&  <span> {yearStart(item)} </span> }
                                    {item.runtime &&  <span> { item.runtime } </span> }
                                    <span>Cert. TV-MA</span>
                                </div>
                            </>
                            }
                        </div>
                        <div className={st.panel__desc}>
                            After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds to find what was stolen from him and restore his power.
                        </div>
                        <button type="button" className="button button_icon trailer">
                        <span className="icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                fill="#fff">
                                <path d="M3 22v-20l18 10-18 10z"></path>
                            </svg>
                        </span>
                            <span className="txt">Смотреть трейлер</span>
                        </button>
                    </div>
                </div>
            </div>
            {/*{modalVisible && <Modal data={}*/}
            {/*                            selectIndex={}*/}
            {/*                            closeModal={closeModel}*/}
            {/*/>}*/}
        </>

    );
};

export default PanelMovie;