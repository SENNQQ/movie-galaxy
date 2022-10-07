import React, {FC} from 'react';
import st from './CreditsGroup.module.scss';
import CreditsHistoryItem from "../CreditsHistoryItem";
import {CreditsHistoryGroupProps} from "./types";

const CreditsHistoryGroup:FC<CreditsHistoryGroupProps> = ({groups}) => {

    return (
        <tr className={st.table__group}>
            <td className={st.table__row}>
                <table>
                    <tbody>
                    {groups.credits.map((credit,index) => ( <CreditsHistoryItem
                            key={`${index}-credits-item-${groups.year}-${groups.credits.length}`}
                            year={groups.year}
                            credit={credit}/>
                    ))}
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default CreditsHistoryGroup;