import React, { useEffect } from 'react';
import '../../assets/css/main/Welcome.css';

const Error = () => {
    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
        document.body.classList.add('error');
    }, []);

    return <div className={'wrapper'} />
};

export default Error;