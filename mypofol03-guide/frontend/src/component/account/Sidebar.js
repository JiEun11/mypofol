import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/css/account/Sidebar.css';

const Sidebar = ({ account }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='profile-pic'>
          <a href='#'>
            <img src={account.profileImage} />
          </a>
        </div>
        <h1 className='vcard-names'>
          <span className='name'>{account.name}</span>
          <span className='title'>{account.status}</span>
        </h1>
      </div>
      <div className='sidebar-content'>
        <nav className='navbar'>
          <ul>
            <li>
              <NavLink to={`/${account.name}/profile`}>
                <span className='item-ico'>
                  <i className='fa fa-address-card'></i>
                </span>
                <span className='item-label'>프로필</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${account.name}/experiences`} >
                <span className='item-ico'>
                  <i className='fa fa-list-ul'></i>
                </span>
                <span className='item-label'>경력</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${account.name}/educations`}>
                <span className='item-ico'>
                  <i className='fa fa-graduation-cap'></i>
                </span>
                <span className='item-label'>학력</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${account.name}/trainings`}>
                <span className='item-ico'>
                  <i className='fa fa-award'></i>
                </span>
                <span className='item-label'>교육 및 자격증</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${account.name}/skills`}>
                <span className='item-ico'>
                  <i className='fa fa-code'></i>
                </span>
                <span className='item-label'>주요기술</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${account.name}/projects`}>
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

export default Sidebar;
