import React, { useRef } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import '../../assets/css/main/DialogSignin.css';

const DialogSignup = () => {
    const navigate = useNavigate();
    const refForm = useRef(null);

    return (
        <div className='form signup-form'>
            <div className='form-header'>
                <h1>Sign up</h1>
            </div>
            <div className='form-body'>
                <form ref={refForm} action='/api/signup' acceptCharset='UTF-8' method='post' onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        const account = Array.from(e.target, (input) => {
                            return { n: input.name, v: input.value };
                        })
                            .filter(({ n }) => n !== '')
                            .reduce((res, { n, v }) => {
                                res[n] = v;
                                return res;
                            }, {});

                        const response = await fetch(e.target.action, {
                            method: e.target.method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(account)
                        });
                        if (!response.ok) {
                            throw new Error(`${response.status} ${response.statusText}`);
                        }

                        const json = await response.json();
                        if (json.result !== 'success') {
                            throw new Error(`${json.result} ${json.message}`);
                        }

                        refForm.current.reset();
                        navigate("/welcome");

                    } catch (err) {
                        console.error(err);
                        navigate('/error');
                    }
                }}>

                    <label className='form-label' htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' className='form-control input-block' autoCapitalize='none' autoCorrect='off' autoFocus='autofocus' required />

                    <label className='form-label' htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' className='form-control input-block' autoComplete='current-password' required />

                    <label className='form-label' htmlFor='username'>Username</label>
                    <input type='text' name='name' id='username' className='form-control input-block' autoComplete='username' required />

                    <input type='submit' value='Sign up' className='form-btn input-block' />
                </form>
            </div>
            <p className='login-callout'>
                <span>My Portfolio에 이미 가입했습니다. </span>
                <label>
                    <NavLink to={"/signin"}>로그인</NavLink>
                </label>
            </p>
        </div>
    );
};

export default DialogSignup;