import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../../assets/css/main/Welcome.css';

const Welcome = () => {
    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
        document.body.classList.add('welcome');
    }, []);

    return (
        <div className={'wrapper'}>
            <p className="greetings">
                MyPofol 가입이 완료 되었습니다! <br />
                <NavLink to={"/signin"}>로그인</NavLink>
            </p>
        </div>
    );
};

export default Welcome;