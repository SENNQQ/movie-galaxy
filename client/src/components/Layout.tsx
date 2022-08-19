import React from 'react';
import {Outlet} from "react-router-dom";
import "../style/Layout.scss";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div>
            <div className="wrapper">
                <Sidebar/>
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