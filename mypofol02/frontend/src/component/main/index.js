import React, {useEffect} from 'react';
import Header from '../../layout/Header';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';

import '../../assets/css/component/main/Index.css';
const Index = ({dialog, theme}) => {

    useEffect(() => {
        document.body.classList.add(...(theme === 'welcome' ? ['full-wide', 'welcome'] : ['full-wide']));
    });

    return (
        <>
            <Header />
            <div className={ dialog === 'signup' || dialog === 'signin' ? "wrapper overlay" : "wrapper" }>
                { theme === 'welcome' ? <Welcome /> : null }
                { dialog === 'signup' ? <DialogSignup /> : dialog === 'signin' ? <DialogSignin /> : null }
            </div> 
        </>
    );
};

export default Index;