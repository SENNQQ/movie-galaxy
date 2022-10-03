import React from 'react';
import st from "./CreditsHistory.module.scss"
import CreditsHistoryGroup from "../CreditsHistoryGroup";

const CreditsHistory = () => {
    return (

        <>
            <div className="spacing">
                <div className={st.head}>
                    <div className={st.filter}>
                        <label htmlFor="credits_category">
                            Department
                        </label>
                        <div className={st.headDropdown}>
                            <select name="infoVideo_dropdown">
                                <option value="all">All</option>
                                <option value="all">All 2</option>
                                <option value="all">All 3</option>
                                <option value="all">All 4</option>
                            </select>
                            {/*<select name="infoVideo_dropdown" onChange={(event) => filterVideos(event)}>*/}
                            {/*    <option value="all">All</option>*/}
                            {/*    {videoTypes().map((item) => <option value={item} key={item}>{item}</option>)}*/}
                            {/*</select>*/}

                            {/*<strong className={st.headDropdown__count}>*/}
                            {/*    {activeVideos.length} {activeVideos.length > 1 ? "Videos" : "Video"}*/}
                            {/*</strong>*/}
                        </div>
                    </div>
                    <div className={st.filter}>
                        <label htmlFor="credits_category">
                            Media
                        </label>
                        <div className={st.headDropdown}>
                            <select name="infoVideo_dropdown">
                                <option value="all">All</option>
                                <option value="all">All 2</option>
                                <option value="all">All 3</option>
                                <option value="all">All 4</option>
                            </select>
                            {/*<select name="infoVideo_dropdown" onChange={(event) => filterVideos(event)}>*/}
                            {/*    <option value="all">All</option>*/}
                            {/*    {videoTypes().map((item) => <option value={item} key={item}>{item}</option>)}*/}
                            {/*</select>*/}

                            {/*<strong className={st.headDropdown__count}>*/}
                            {/*    {activeVideos.length} {activeVideos.length > 1 ? "Videos" : "Video"}*/}
                            {/*</strong>*/}
                        </div>
                    </div>
                </div>
                <div className={st.category}>
                    <h2 className={st.title}>Acting</h2>

                    <table>
                        <tbody>
                        <CreditsHistoryGroup/>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CreditsHistory;