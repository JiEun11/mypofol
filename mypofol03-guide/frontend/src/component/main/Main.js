import React, { useEffect } from 'react';
import { Header } from '../common';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';
import '../../assets/css/main/Main.css';

const Main = ({ theme, dialog }) => {
    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
        theme && document.body.classList.add(theme);
    }, []);

    return (
        <>
            <Header />
            <div className={dialog ? "wrapper overlay" : "wrapper"}>
                {theme === 'welcome' ? <Welcome /> : null}
                {dialog === 'signup' ? <DialogSignup /> : null}
                {dialog === 'signin' ? <DialogSignin /> : null}
            </div>
        </>
    );
};

export default Main;