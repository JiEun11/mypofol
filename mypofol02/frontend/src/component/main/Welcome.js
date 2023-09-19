import React from 'react';
import '../../assets/css/component/main/Welcome.css';

const Welcome = () => {
    return (
        <p className="greetings">
            MyPofol 가입이 완료 되었습니다! <br/>
            <label className="btn" for="dialog-signin-popup">로그인</label> 
        </p> 
    );
};

export default Welcome;