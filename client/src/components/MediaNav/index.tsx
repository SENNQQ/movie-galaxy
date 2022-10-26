import React, {FC, useState} from 'react';
import st from './NavPerson.module.scss';
import cn from 'classnames'
import {MediaNavType} from "./types";


const MediaNav: FC<MediaNavType> = ({
                                        menu,
                                        changeTabHandler,
                                        styleContainer,
                                        styleButton,
                                        catalogIndex= 0
                                    }) => {

    const [active, setActive] = useState<number>(catalogIndex);

    const clicked = (index: number, item: string) => {
        setActive(index);
        changeTabHandler(item.replace(/\s+/g, '-').toLowerCase());
    }

    return (
        <div className={cn(st.nav_movie)} style={styleContainer}>
            {menu.map((item, index) => (
                <button type="button" key={`tab-${index}`}
                        className={cn(st.button_movie, {[st.buttonActive]: active === index})}
                        onClick={() => clicked(index, item)}
                        style={styleButton}>
                    {item}
                </button>
            ))}
        </div>
    );
};

export default MediaNav;