import React, {FC} from 'react';
import {useAppSelector} from "../store/hook";
import {Navigate, Outlet } from "react-router-dom";

const RequireAuth:FC = () => {
    const {userData} = useAppSelector(state => state.user);

    if(userData !=null && !userData.admin) {
        return <Navigate to={'/'}  replace/>
    } else{
        return <Outlet/>
    }

};

export default RequireAuth;