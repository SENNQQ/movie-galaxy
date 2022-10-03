import React from 'react';
import st from './CreditsGroup.module.scss';
import CreditsHistoryItem from "../CreditsHistoryItem";

const CreditsHistoryGroup = () => {
    return (
        <tr className={st.table__group}>
            <td className={st.table__row}>
                <table>
                    <tbody>
                    <CreditsHistoryItem/>
                    <CreditsHistoryItem/>
                    <CreditsHistoryItem/>
                    <CreditsHistoryItem/>
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default CreditsHistoryGroup;