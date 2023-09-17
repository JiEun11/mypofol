import React from "react";
import '../../assets/css/account/sidebar.css';

const Sidebar = () => {
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
            <li class="nav-active">
              <a href="/bella/profile">
                <span class="item-ico">
                  <i class="fa fa-address-card"></i>
                </span>
                <span class="item-label">프로필</span>
              </a>
            </li>
            <li class="">
              <a href="/bella/experiences">
                <span class="item-ico">
                  <i class="fa fa-list-ul"></i>
                </span>
                <span class="item-label">경력</span>
              </a>
            </li>
            <li class="">
              <a href="/bella/educations">
                <span class="item-ico">
                  <i class="fa fa-graduation-cap"></i>
                </span>
                <span class="item-label">학력</span>
              </a>
            </li>
            <li class="">
              <a href="/bella/trainings">
                <span class="item-ico">
                  <i class="fa fa-award"></i>
                </span>
                <span class="item-label">교육 및 자격증</span>
              </a>
            </li>
            <li class="">
              <a href="/bella/skills">
                <span class="item-ico">
                  <i class="fa fa-code"></i>
                </span>
                <span class="item-label">주요기술</span>
              </a>
            </li>
            <li class="">
              <a href="/bella/projects">
                <span class="item-ico">
                  <i class="fa fa-diagram-project"></i>
                </span>
                <span class="item-label">프로젝트</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
