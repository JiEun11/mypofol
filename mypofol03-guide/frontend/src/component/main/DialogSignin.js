import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../auth';
import '../../assets/css/main/Dialog.css';

const DialogSignin = () => {
    const refForm = useRef(null);
    const [signinFail, setSigninFail] = useState(false);
    const { storeToken } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList = [];
        document.body.classList.add('full-wide');
    }, []);

    return (
        <div className={'wrapper overlay'}>
            <div className='form signin-form'>
                <div className='form-header'>
                    <h1>Sign in</h1>
                </div>
                <div className='form-body'>
                    <form ref={refForm} action='/api/auth' acceptCharset='UTF-8' method='post' onSubmit={async (e) => {
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

                            if (!json.data) {
                                /* Authentication fails... */
                                e.target.password.value = '';
                                setSigninFail(true);
                                return;
                            }

                            refForm.current.reset();
                            storeToken(json.data.accessToken);

                        } catch (error) {
                            console.error(error);
                            navigate('/error');
                        }
                    }}>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' className='form-control input-block' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' required />
                        <div className='position-relative'>
                            <label className='form-label' htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' className='form-control input-block' autoComplete='current-password' required />
                            <input type='submit' value='Sign in' className='form-btn input-block' />
                            <a className='label-link' id='forgot-password' tabIndex='0' href='#'>비밀번호를 잊었습니까?</a>
                        </div>
                    </form>
                    <div className={'login-error-wrap'}>
                        {
                            signinFail ?
                                <span>
                                    The Email or password you entered is incorrect.
                                </span>
                                :
                                null
                        }
                    </div>
                </div>
                <p className='login-callout'>
                    <span>My Portfolio에 처음입니까? </span>
                    <label>
                        <NavLink to={"/signup"}>회원가입</NavLink>
                    </label>
                </p>
            </div>
        </div>
    );
};

export default DialogSignin;