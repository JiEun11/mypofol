import React from 'react';
import { Outlet, useOutletContext } from 'react-router';
import Header from './Header';
import '../../assets/css/layout/LayoutMain.css';

const LayoutMain = () => {
    const authAccount = useOutletContext();

    return (
        <>
            <Header account={authAccount}/>
            <Outlet />
        </>
    );
};

export default LayoutMain;