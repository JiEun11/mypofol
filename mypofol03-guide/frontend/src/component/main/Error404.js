import React, { useEffect } from 'react';
import '../../assets/css/main/Welcome.css';

const Error = () => {
    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
        document.body.classList.add('error');
    }, []);

    return (
        <div className={'wrapper'}>
            <h1>404!!!!!!!!</h1>
        </div>);
};

export default Error;