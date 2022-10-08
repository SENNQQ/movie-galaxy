import React from 'react';
import LoadableImage from "../LoadableImage";
import st from './episodes.module.scss';


const Episodes = () => {

    

    return (
        <div className={"spacing"}>
            <div className={st.head}>10 Episodes</div>
            <div className={st.items}>
                <div className={st.item}>
                    <div className={st.item__image}>
                        <LoadableImage src="https://image.tmdb.org/t/p/w400/xVarmFYSuNWOfjAqqELJKHgk4w0.jpg" alt=""/>
                    </div>
                    <div className={st.item__name}>
                        <strong>E01 </strong>
                        Episode One
                    </div>
                    <div className={st.item__overview}>
                        After throwing his neighbor off the stench coming from his apartment, Jeff heads to a local bar, where a stranger takes him up on a tempting offer.
                    </div>
                    <div className={st.item__aired}>
                        21 September 2022
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Episodes;