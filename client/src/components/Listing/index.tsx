import React, {FC} from 'react';
import st from './Listring.module.scss';
import {ListingPropsType} from "./types";
import Card from "../Card";

const Listing: FC<ListingPropsType> = ({
                                           items,
                                           title,
                                           loading,
                                           loadMore
                                       }) => {
    return (
        <div className="spacing">
            <div className={st.listing}>
                {title &&
                    <div className={st.listing__head}>
                        <h2 className={st.listing__title}>{title}</h2>
                    </div>
                }
                <div className={st.listing__items}>
                    {items.map((item, index) => (<Card item={item} key={index}/>))}
                </div>
            </div>
        </div>
    );
};

export default Listing;