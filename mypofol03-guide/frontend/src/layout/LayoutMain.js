import React, { useEffect } from 'react';
import Header from './Header';

import '../assets/css/layout/LayoutMain.css';

const LayoutMain = ({ overlay, children }) => {
    return (
        <>
            <Header />
            <div className={overlay ? "wrapper overlay" : "wrapper"}>
                {children}
            </div>
        </>
    );
};

export default LayoutMain;