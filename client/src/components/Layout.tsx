import React from 'react';
import {Outlet} from "react-router-dom";
import "../style/Layout.scss";
import Sidebar from "./Global/Sidebar";
import Footer from "./Global/Footer";

const Layout = () => {
    return (
        <div>
            <div className="wrapper">
                <Sidebar/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    );
};

export default Layout;