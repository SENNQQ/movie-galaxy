import React, {FC} from 'react';
import st from "./episodesItem.module.scss";
import LoadableImage from "../../LoadableImage";
import {episodeItemPropsType} from "./types";
import {apiImgUrl} from "../../../api/zxc";
import {fullDate, numberWithDoubleDigits, truncate} from "../../../helper/additionalFun";

const EpisodesItem: FC<episodeItemPropsType> = ({item}) => {

    const poster = () => {
        if (item.still_path) {
            return `${apiImgUrl}/w400${item.still_path}`;
        } else {
            return "";
        }
    }
    const posterItem = poster();

    return (
        <div className={st.item}>
            <div className={st.item__image}>
                <LoadableImage src={posterItem} alt=""/>
            </div>
            <div className={st.item__name}>
                <strong>E{numberWithDoubleDigits(item.episode_number)} </strong>
                {item.name}
            </div>
            <div className={st.item__overview}>
                {truncate(item.overview, 300)}
            </div>
            <div className={st.item__aired}>
                {fullDate(item.air_date)}
            </div>
        </div>
    );
};

export default EpisodesItem;