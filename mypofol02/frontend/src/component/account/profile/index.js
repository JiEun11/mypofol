import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import LayoutAccount from "../../../layout/LayoutAccount";
import "../../../assets/css/component/account/Profile.css";

const Profile = () => {
  const { accountName } = useParams();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {      
      const response = await fetch(`/api/${accountName}/profile`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }

      setProfile(json.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <LayoutAccount>
      <div className="profile">
        <div className="content-inner">
          <div className="content-header">
            <h2>프로필</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul>
                <li>
                  <h3>
                    <i className="fa fa-user"></i>
                    <span>이름</span>
                  </h3>
                  <span>{profile && profile.name}</span>
                </li>
                <li>
                  <h3>
                    <i className="fa fa-cake-candles"></i>
                    <span>생년월일</span>
                  </h3>
                  <span>{profile && profile.birth}</span>
                </li>
                <li>
                  <h3>
                    <i className="fa fa-house"></i>
                    <span>거주지</span>
                  </h3>
                  <span>{profile && profile.district}</span>
                </li>
                <li>
                  <h3>
                    <i className="fa fa-location-dot"></i>
                    <span>연락처</span>
                  </h3>
                  <span>{profile && profile.phone}</span>
                </li>
                <li>
                  <h3>
                    <i className="fa fa-envelope"></i>
                    <span>이메일</span>
                  </h3>
                  <span>{profile && profile.email}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h3>
                    <i className="fa fa-blog"></i>
                    <span>블로그</span>
                  </h3>
                  <span>
                    <a href={profile && profile.blog} target="_blank">
                      {profile && profile.blog}
                    </a>
                  </span>
                </li>
                <li>
                  <h3>
                    <i className="fa-brands fa-github"></i>
                    <span>GitHub</span>
                  </h3>
                  <span>
                    <a href={profile && profile.link2} target="_blank">
                      {profile && profile.link2}
                    </a>
                  </span>
                </li>
                <li>
                  <h3>
                    <i className="fa-brands fa-youtube"></i>
                    <span>YouTube</span>
                  </h3>
                  <span>
                    <a href={profile && profile.link3} target="_blank">
                      {profile && profile.link3}
                    </a>
                  </span>
                </li>
                <li>
                  <h3>
                    <i className="fa-brands fa-instagram"></i>
                    <span>Instagram</span>
                  </h3>
                  <span>
                    <a href={profile && profile.link1} target="_blank">
                      {profile && profile.link1}
                    </a>
                  </span>
                </li>
              </ul>
              <div>
                <h3>
                  <i className="fa fa-pen-nib"></i>
                  <span>자기소개</span>
                </h3>
                <p>{profile && profile.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="large-btn">
          <div>
            <a className="btn" href="#">
              <i className="fa fa-download"></i>
              <span>Resume</span>
            </a>
            <a className="btn" href="#">
              <i className="fa fa-hands-helping"></i>
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
};

export default Profile;
