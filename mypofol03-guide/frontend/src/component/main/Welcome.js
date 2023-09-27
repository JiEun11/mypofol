import React from 'react';
import { NavLink } from "react-router-dom";
import '../../assets/css/component/main/Welcome.css';

const Welcome = () => {
    return (
        <p className="greetings">
            MyPofol 가입이 완료 되었습니다! <br />
            <NavLink to={"/signin"}>로그인</NavLink>
        </p>
    );
};

export default Welcome;