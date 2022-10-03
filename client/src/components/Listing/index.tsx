import React, {FC} from 'react';
import st from './Listring.module.scss';
import {ListingPropsType} from "./types";
import CardCarousel from "../CardCarousel";

const Listing:FC<ListingPropsType> = ({items}) => {

    return (
        <div className="spacing">
            <div className={st.listing}>
                <div className={st.listing__items}>
                    {items.map((item,index) => (<CardCarousel item={item} key={index}/>))}
                </div>
            </div>
        </div>
    );
};

export default Listing;