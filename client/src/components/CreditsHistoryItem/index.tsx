import React, {FC} from 'react';
import st from './CreditsItem.module.scss';
import {CreditsHistoryItemProps} from "./types";
import {Link} from "react-router-dom";

const CreditsHistoryItem: FC<CreditsHistoryItemProps> = ({
                                                             year,
                                                             credit
                                                         }) => {
    const media = () => {
        if (credit.media_type) {
            return credit.media_type;
        } else if (credit.name) {
            return 'tv';
        } else {
            return 'movie';
        }
    }

    const name = () => {
        return credit.title ? credit.title : credit.name;
    }

    const role = () => {
        const character = credit.character;
        const job = credit.job;
        if (character) {
            return `as ${character}`;
        } else if (job) {
            return `as ${job}`;
        } else {
            return false;
        }
    }

    const episodes = () => {
        const episodes = credit.episode_count;
        if (episodes) {
            if (episodes > 1) {
                return `(${episodes} episodes)`;
            } else {
                return `(${episodes} episode)`;
            }
        } else {
            return false;
        }
    }


    return (
        <tr className={st.item}>
            <td className={st.year}> {year ? year : '—'}</td>
            <td>
                <Link to={`/${ media()}/${credit.id}`}>
                    <strong>{name()}</strong>
                    {episodes() && <span className={st.episodes}> {episodes()} </span>}
                    {role() && <span className={st.role}> {role()} </span>}
                </Link>
            </td>
        </tr>
    );
};

export default CreditsHistoryItem;