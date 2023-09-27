import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../auth';
import jwt_decode from "jwt-decode";

import SidePannel from './SidePannel';
import '../assets/css/layout/Header.css';

const Header = () => {
    const { token } = useAuthContext();
    const [openSidePannel, setOpenSidePannel] = useState(false);
    const account = token && jwt_decode(token);

    return (
        <>
            <header className='header'>
                <div className='globalbar'>
                    <div className='inner-start'>
                        <a href='/' className='app-logo'>MyPofol</a>
                        {
                            account ?
                                <div className='header-context'>
                                    <ul>
                                        <li>
                                            <span className={'context-item'}>
                                                <NavLink to={`/${account.name}`}>{account.name}</NavLink>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className='inner-end'>
                        {
                            account ?
                                <>
                                    <a className='header-button has-indicator'>
                                        <svg viewBox='0 0 16 16' className='inbox'>
                                            <path d='M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z'></path>
                                        </svg>
                                    </a>
                                    <a className='header-user' onClick={(e) => {
                                        e.preventDefault();
                                        setOpenSidePannel(true);
                                    }}>
                                        <img src={account.profileImage} />
                                    </a>
                                </>
                                :
                                <>
                                    <div className='header-context'>
                                        <ul>
                                            <li>
                                                <label className='context-item'>
                                                    <NavLink to={'/signin'}>로그인</NavLink>
                                                </label>
                                            </li>
                                            <li>
                                                <label className='context-item'>
                                                    <NavLink to={'/signup'}>회원가입</NavLink>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </header>
            {
                account ?
                    <SidePannel
                        account={account}
                        open={openSidePannel}
                        openToggle={setOpenSidePannel} />
                    :
                    null
            }
        </>
    );
};

export default Header;