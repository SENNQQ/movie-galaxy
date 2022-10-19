import React from 'react';
import {Link} from "react-router-dom";
import st from "./pageNotFound.module.scss"

const PageNotFound = () => {
    return (
        <div className={st.block}>
            <div className={st.error}>
                <div className={st.title}> Page Not Found </div>
                <div className={st.message}>
                    <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
                    <p>Back to our <Link to={"/"} className={st.message_active}>home page.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;