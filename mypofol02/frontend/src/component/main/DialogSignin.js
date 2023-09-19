import React from 'react';

const DialogSignin = ({openDialog}) => {
    return (
        <div className="form position-relative">
            <div className="form-header">
                <h1>Sign in</h1>
            </div>	  
            <div className="form-body">
                <form action="/auth" acceptCharset="UTF-8" method="post">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="form-control input-block" autoCapitalize="none" autoCorrect="off" autoComplete="username" autoFocus="autofocus"/>      
                    <div className="position-relative">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control input-block" autoComplete="current-password"/>            
                        <input type="submit" name="commit" value="Sign in" className="form-btn input-block"/>      
                        <a className="label-link" id="forgot-password" tabIndex="0" href="#">비밀번호를 잊었습니까?</a>
                    </div>
                </form>
            </div>
            <p className="login-callout">
                <span>My Portfolio에 처음입니까? </span>
                <label onClick={() => {
                    openDialog('signup');
                }}>가입하기</label>
            </p>  
        </div>
    );
};

export default DialogSignin;