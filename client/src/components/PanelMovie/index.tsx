import React from 'react';
import spider from '../../image/mPqIjQk2rqU2mfFLJzDGeRwpIuU.jpg'
import st from './panel.module.scss'

const PanelMovie = () => {
    return (
        <div className={st.hero}>
            <div className={st.backdrop}>
                <img src={spider} alt="spider"/>
            </div>
            <div className={st.panel}>
                <div className="panel_container">
                    <h1 className={st.panel__title}>
                        <a>The SandMan</a>
                    </h1>
                    <div className={st.panel__meta}>
                        <div className="rating">
                            <div className="stars">
                               <div style={{width:"82%"}}></div>
                            </div>
                            <div>389 Reviews</div>
                        </div>
                        <div className={st.panel__meta__info}>
                            <span>Season 1</span>
                            <span>2022</span>
                            <span>Cert. TV-MA</span>
                        </div>
                    </div>
                    <div className={st.panel__desc}>
                        After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds to find what was stolen from him and restore his power.
                    </div>
                    <button type="button" className="button button--icon trailer_3TaRf">
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
    );
};

export default PanelMovie;