import React from 'react';
import {NavLink} from "react-router-dom";

const DialogSignin = ({openDialog}) => {
    return (
        <div className='form position-relative'>
            <div className='form-header'>
                <h1>Sign in</h1>
            </div>	  
            <div className='form-body'>
                <form 
                    action='/auth'
                    acceptCharset='UTF-8'
                    method='post'
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' className='form-control input-block' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' required/>      
                    <div className='position-relative'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' className='form-control input-block' autoComplete='current-password' required/>            
                        <input type='submit' name='commit' value='Sign in' className='form-btn input-block'/>      
                        <a className='label-link' id='forgot-password' tabIndex='0' href='#'>비밀번호를 잊었습니까?</a>
                    </div>
                </form>
            </div>
            <p className='login-callout'>
                <span>My Portfolio에 처음입니까? </span>
                <label>
                    <NavLink to={"/signup"}>회원가입</NavLink>
                </label>
            </p>  
        </div>
    );
};

export default DialogSignin;