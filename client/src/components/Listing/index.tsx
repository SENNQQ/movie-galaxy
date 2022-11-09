import React, {FC} from 'react';
import st from './Listring.module.scss';
import {ListingPropsType} from "./types";
import Card from "../Card";

const Listing: FC<ListingPropsType> = ({
                                           items,
                                           title,
                                           loading,
                                           loadMore,
                                           closeSearch
                                       }) => {
    return (
        <div className="spacing">
            <div className={st.listing}>
                {items.length === 0 && <div className={st.listing__head}>
                    <h2 className={st.listing__title}>Nothing found :(</h2>
                </div>}
                {items.length > 0 && title &&
                    <div className={st.listing__head}>
                        <h2 className={st.listing__title}>{title}</h2>
                    </div>
                }
                <div className={st.listing__items}>
                    {items.length > 0 && items.map((item, index) => (
                        <Card
                            item={item}
                            key={index}
                            closeSearch={closeSearch}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listing;