import React, { useEffect } from 'react';
import { LayoutMain } from '../../layout';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';
import '../../assets/css/component/main/Main.css';

const Main = ({ theme, dialog }) => {
    return (
        <LayoutMain theme={theme} overlay={dialog}>
            {theme === 'welcome' ? <Welcome /> : null}
            {dialog === 'signup' ? <DialogSignup /> : null}
            {dialog === 'signin' ? <DialogSignin /> : null}
        </LayoutMain>
    );
};

export default Main;