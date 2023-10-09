import React, { useRef } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { useAuthContext } from '../../auth';

const DialogSignin = () => {
  const navigate = useNavigate();
  const refForm = useRef(null);
  const { storeToken } = useAuthContext();

    return (
        <div className='form position-relative'>
            <div className='form-header'>
                <h1>Sign in</h1>
            </div>	  
            <div className='form-body'>
                <form
                    ref={refForm}
                    action='/api/auth'
                    acceptCharset='UTF-8'
                    method='post'
                    onSubmit={ async (e) => {
                      e.preventDefault();

                      try {
                        const account = Array.from(e.target, (input)=>{
                          return {n: input.name, v:input.value};
                        })
                        .filter(({n}) => n !== '')
                        .reduce((res, {n, v}) => {
                            res[n] = v;
                            return res;
                        }, {});

                        // reset form
                        refForm.current.reset();

                        console.log(account, e.target.method, e.target.action);

                        // post
                        const response = await fetch(e.target.action, {
                          method: e.target.method,
                          headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                          },
                          body:JSON.stringify(account)
                      });

                      if (!response.ok) {
                          throw new Error(`${response.status} ${response.statusText}`);
                      }
          
                      const json = await response.json();
                      console.log(json);
                      if(json.result !== 'success') {
                          throw new Error(`${json.result} ${json.message}`);
                      }

                      storeToken(json.data.accessToken);
                      
                      } catch (error) {
                        console.error(error);
                      }
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