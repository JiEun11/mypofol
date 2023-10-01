import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import '../../assets/css/layout/LayoutMain.css';

const LayoutMain = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default LayoutMain;