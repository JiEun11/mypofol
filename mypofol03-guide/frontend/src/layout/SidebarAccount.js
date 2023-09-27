import React from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../assets/css/layout/SidebarAccount.css';

const SidebarAccount = () => {
  const { accountName } = useParams();

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='profile-pic'>
          <a href='#'>
            <img src='/images/default_profile.png' />
          </a>
        </div>
        <h1 className='vcard-names'>
          <span className='name'>bella</span>
          <span className='title'>developer</span>
        </h1>
      </div>
      <div className='sidebar-content'>
        <nav className='navbar'>
          <ul>
            <li>
              <NavLink to={`/${accountName}/profile`}>
                <span className='item-ico'>
                  <i className='fa fa-address-card'></i>
                </span>
                <span className='item-label'>프로필</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${accountName}/experiences`} >
                <span className='item-ico'>
                  <i className='fa fa-list-ul'></i>
                </span>
                <span className='item-label'>경력</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${accountName}/educations`}>
                <span className='item-ico'>
                  <i className='fa fa-graduation-cap'></i>
                </span>
                <span className='item-label'>학력</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${accountName}/trainings`}>
                <span className='item-ico'>
                  <i className='fa fa-award'></i>
                </span>
                <span className='item-label'>교육 및 자격증</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${accountName}/skills`}>
                <span className='item-ico'>
                  <i className='fa fa-code'></i>
                </span>
                <span className='item-label'>주요기술</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${accountName}/projects`}>
                <span className='item-ico'>
                  <i className='fa fa-diagram-project'></i>
                </span>
                <span className='item-label'>프로젝트</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarAccount;
