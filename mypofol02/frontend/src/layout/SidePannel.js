import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../auth';

import '../assets/css/layout/SidePannel.css';

const SidePannel = ({account, open, openToggle}) => {
    const { storeToken } = useAuthContext();
    
    return (
        <div className={open ? 'side-pannel-open' : 'side-pannel-close'}>
            <div className='overlay-side-pannel' />
            <div className='side-pannel'>
                <div className='side-pannel-header'>
                    <div className='side-pannel-header-content-wrap'>
                        <div className='side-pannel-title-wrap'>
                            <div className='d-flex'>
                                <div className='side-pannel-user'>
                                    <img src={account.profileImage} />
                                </div>
                                <div className='overflow-hidden d-flex width-full'>
                                    <div className='lh-condensed overflow-hidden d-flex flex-column ml-2 f5 mr-auto width-full'>
                                        <span className='title'>
                                            <span>{account.name}</span>
                                        </span>
                                        <span className='title sub'>
                                            <span>{account.profileName}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='side-pannel-close-wrap'>
                            <label onClick={() => {
                                openToggle((open) => !open);
                            }}>
                                <svg aria-hidden='true' height='16' viewBox='0 0 16 16' version='1.1' width='16'>
                                    <path d='M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z'></path>
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='side-pannel-body d-flex'>
                    <nav className='action-list'>
                        <ul>
                            <li>
                                <NavLink to={`/${account.name}`}>
                                    <span className='action-list-item-ico'><i className='fa fa-user'></i></span>
                                    <span className='action-list-item-label'>나의 포트폴리오</span>
                                </NavLink>
                            </li>

                            <li></li>

                            <li>
                                <a href='/dashboard/profile'>
                                    <span className='action-list-item-ico'><i className='fa fa-address-card'></i></span>
                                    <span className='action-list-item-label'>프로필 수정</span>
                                </a>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/educations'}>
                                    <span className='action-list-item-ico'><i className='fa fa-graduation-cap'></i></span>
                                    <span className='action-list-item-label'>학력 수정</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/experiences'}>
                                    <span className='action-list-item-ico'><i className='fa fa-list-ul'></i></span>
                                    <span className='action-list-item-label'>경력 수정</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/trainings'}>
                                    <span className='action-list-item-ico'><i className='fa fa-award'></i></span>
                                    <span className='action-list-item-label'>교육 및 자격증 추가</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/projects'}>
                                    <span className='action-list-item-ico'><i className='fa fa-diagram-project'></i></span>
                                    <span className='action-list-item-label'>프로젝트 수정</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/dashboard/skills'}>
                                    <span className='action-list-item-ico'><i className='fa fa-code'></i></span>
                                    <span className='action-list-item-label'>주요기술 수정</span>
                                </NavLink>
                            </li>

                            <li></li>

                            <li>
                                <a href='#'>
                                    <span className='action-list-item-ico'><i className='fa fa-file-pdf'></i></span>
                                    <span className='action-list-item-label'>이력서 다운로드</span>
                                </a>
                            </li>

                            <li></li>

                            <li>
                                <a href='#' onClick={async (e) => {
                                    e.preventDefault();

                                    try {
                                      const response = await fetch('/api/signout', {
                                        method: "get",
                                        headers: {
                                          "Content-Type": "application/json",
                                          "Accept": "application/json",
                                        }
                                      });
                    
                                      if (!response.ok) {
                                        throw new Error(`${response.status} ${response.statusText}`);
                                      }
                    
                                      const json = await response.json();
                    
                                      if (json.result !== "success") {
                                        throw new Error(`${json.result} ${json.message}`);
                                      }

                                      storeToken(null);

                                    } catch (error) {
                                      console.error(error);
                                    }                                    
                                }}>
                                    <span className='action-list-item-ico'><i className='fa fa-right-from-bracket'></i></span>
                                    <span className='action-list-item-label'>로그아웃</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SidePannel;