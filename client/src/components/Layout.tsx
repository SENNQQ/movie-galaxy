import React from 'react';
import {Outlet} from "react-router-dom";
import "../style/Layout.scss";
import Sidebar from "./Global/Sidebar";
import Footer from "./Global/Footer";
import SearchForm from "./Global/SearchForm";
import {useAppSelector} from "../store/hook";

const Layout = () => {
    const {searchOpen} = useAppSelector(state => state.search);

    return (
        <div>
            {searchOpen && <SearchForm/>}
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