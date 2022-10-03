import React from 'react';
import st from './CreditsItem.module.scss';

const CreditsHistoryItem = () => {
    return (
        <tr className={st.item}>
            <td className={st.year}>1656</td>
            <td>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href={"#"}>
                    <strong>Name</strong>
                    <span className={st.episodes}> (10 episodes) </span>
                    <span className={st.role}> as Alan Strauss </span>
                </a>
            </td>
        </tr>
    );
};

export default CreditsHistoryItem;