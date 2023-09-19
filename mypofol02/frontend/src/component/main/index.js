import React, {useEffect, useState} from 'react';
import Header from '../../layout/Header';
import Welcome from './Welcome';
import DialogSignup from './DialogSignup';
import DialogSignin from './DialogSignin';

import '../../assets/css/component/main/Index.css';
const Index = () => {
    const [theme, setTheme] = useState('');
    const [dialog, openDialog] = useState(null);
    
    useEffect(() => {
        document.body.classList.add(...(theme === 'welcome' ? ['full-wide', 'welcome'] : ['full-wide']));
    }, [theme]);

    return (
        <>
            <Header
                a={true}
                openDialog={openDialog} />
            <div className={ dialog === 'signup' || dialog === 'signin' ? "wrapper overlay" : "wrapper" }>
                {
                    theme === 'welcome' ?
                        <Welcome 
                            openDialog={openDialog}/> :
                        null
                }
                {
                    dialog === 'signup' ?
                        <DialogSignup
                            openDialog={openDialog}
                            setTheme={setTheme} /> :
                        dialog === 'signin' ?
                            <DialogSignin
                                openDialog={openDialog} /> :
                            null
                }
            </div> 
        </>
    );
};

export default Index;