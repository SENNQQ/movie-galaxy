import React from 'react';
import {Outlet} from "react-router-dom";
import "../style/Layout.scss";
import {MuiNavbar} from "./UI/MuiNavbar";

const Layout = () => {
    return (
        <div>
            <div className="wrapper">
                <MuiNavbar/>
                <main>
                    <Outlet/>
                </main>
                {/*<footer>*/}

                {/*</footer>*/}
            </div>
        </div>
    );
};

export default Layout;