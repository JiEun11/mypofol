import React, { useEffect } from 'react';

import LayoutMain from '../../layout/LayoutMain';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';

import '../../assets/css/component/main/Index.css';

const Index = ({ dialog, theme }) => {
    useEffect(() => {
        document.body.classList = [];

        document.body.classList.add('full-wide');
        theme && document.body.classList.add(theme);
    });

    return (
        <LayoutMain overlay={dialog === 'signup' || dialog === 'signin'}>
            {theme === 'welcome' ? <Welcome /> : null}
            {dialog === 'signup' ? <DialogSignup /> : dialog === 'signin' ? <DialogSignin /> : null}
        </LayoutMain>
    );
};

export default Index;