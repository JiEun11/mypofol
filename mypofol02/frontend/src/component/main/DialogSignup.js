import React from 'react';
import '../../assets/css/component/main/DialogSignin.css';

const DialogSignup = ({openDialog}) => {
    return (
        <div className="form position-relative">
            <div className="form-header">
                <h1>Sign up</h1>
            </div>	  
            <div className="form-body">
                <form action="/signup" acceptCharset="UTF-8" method="post">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="text" name="account[email]" id="email" className="form-control input-block" autoCapitalize="none" autoCorrect="off" autoComplete="username" autoFocus="autofocus"/>      
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" name="account[password]" id="password" className="form-control input-block" autoComplete="current-password"/>            
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" name="account[name]" id="username" className="form-control input-block" autoComplete="current-password"/>            
                    <input type="submit" name="commit" value="Sign up" className="form-btn input-block"/>
                </form>
            </div>
            <p className="login-callout">
                <span>My Portfolio에 이미 가입했습니다. </span>
                <label onClick={() => {
                    openDialog('signin');
                }}>로그인</label>
            </p>  
        </div>
    );
};

export default DialogSignup;