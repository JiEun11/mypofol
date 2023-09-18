import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../../assets/css/account/sidebar.css';

const Sidebar = () => {

  const { accountName } = useParams();

  return (
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="profile-pic">
          <a href="#">
            <img src="/images/default_profile.png" />
          </a>
        </div>
        <h1 class="vcard-names">
          <span class="name">bella</span>
          <span class="title">developer</span>
        </h1>
      </div>
      <div class="sidebar-content">
        <nav class="navbar">
          <ul>
            <li>
              <NavLink to={`/${accountName}/profile`}>
                <span className="item-ico">
                  <i className="fa fa-address-card"></i>
                </span>
                <span className="item-label">프로필</span>
              </NavLink>
            </li>
            <li>
              <a href="/bella/experiences">
                <span className="item-ico">
                  <i className="fa fa-list-ul"></i>
                </span>
                <span className="item-label">경력</span>
              </a>
            </li>
            <li>
              <NavLink to={`/${accountName}/educations`}>
                <span className="item-ico">
                  <i className="fa fa-graduation-cap"></i>
                </span>
                <span className="item-label">학력</span>
              </NavLink>
            </li>
            <li>
              <a href="/bella/trainings">
                <span className="item-ico">
                  <i className="fa fa-award"></i>
                </span>
                <span className="item-label">교육 및 자격증</span>
              </a>
            </li>
            <li>
              <a href="/bella/skills">
                <span className="item-ico">
                  <i className="fa fa-code"></i>
                </span>
                <span className="item-label">주요기술</span>
              </a>
            </li>
            <li>
              <a href="/bella/projects">
                <span className="item-ico">
                  <i className="fa fa-diagram-project"></i>
                </span>
                <span className="item-label">프로젝트</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
