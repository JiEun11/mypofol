import React, { useEffect } from 'react';

const Main = () => {
    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
    }, []);

    return  <div className={'wrapper'} />;
};

export default Main;