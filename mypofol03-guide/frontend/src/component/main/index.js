import React, { useEffect } from 'react';

import LayoutMain from '../../layout/LayoutMain';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';

import '../../assets/css/component/main/Index.css';

const Index = ({ theme, dialog }) => {
    return (
        <LayoutMain theme={theme} overlay={dialog}>
            {theme === 'welcome' ? <Welcome /> : null}
            {dialog === 'signup' ? <DialogSignup /> : null}
            {dialog === 'signin' ? <DialogSignin /> : null}
        </LayoutMain>
    );
};

export default Index;