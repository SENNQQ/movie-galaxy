import React, {FC, useState} from 'react';
import st from '../../oldcomponents/NavMovie/navmovie.module.scss';
import cn from 'classnames'
import {MediaNavType} from "./types";


const MediaNav: FC<MediaNavType> = ({
                                     menu,
                                     changeTabHandler,
                                 }) => {

    const [active, setActive] = useState<number>(0);

    const clicked = (index:number, item:string) => {
        setActive(index);
        changeTabHandler(item.replace(/\s+/g, '-').toLowerCase());
    }

    return (
        <div className={st.nav_movie}>
            {menu.map((item,index) => (
                <button type="button" key={`tab-${index}`}
                        className={cn(st.button_movie, {[st.buttonActive]: active === index})}
                        onClick={() => clicked(index,item)}>
                    {item}
                </button>
            ))}
        </div>
    );
};

export default MediaNav;