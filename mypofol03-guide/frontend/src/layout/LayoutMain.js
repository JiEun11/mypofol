import React, { useEffect } from 'react';
import Header from './Header';

import '../assets/css/layout/LayoutMain.css';

const LayoutMain = ({ theme, overlay, children }) => {
    useEffect(() => {
        document.body.classList = [];

        document.body.classList.add('full-wide');
        theme && document.body.classList.add(theme);
    });

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