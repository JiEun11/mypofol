import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { useAuthContext } from '../../../auth';
import LayoutAccount from "../../../layout/LayoutAccount";

import "../../../assets/css/component/account/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const { token, storeToken } = useAuthContext();
  const { accountName } = useParams();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/${accountName}/profile`, {
        method: 'get',
        redirect: "follow", // redirect 응답 URL로 요청을 다시 하기 위해, (액세스 토큰이 기간이 만료되면 /api/refresh-token 리다이렉션 응답을 받을 수 있음)
        headers: {
          'Authorization': `bearer ${token}`,
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

      // 액세트 토큰이 재발급되면 X-Mypofol-Refresh-Token-At 헤더가 있는 응답을 받음
      // 액세트 토큰이 재발급되지 않는 보통의 경우에는 X-Mypofol-Refresh-Token-At 헤더가 없음
      const accessTokenRefreshedAt = response.headers.get('X-Mypofol-Refresh-Token-At');
      if (accessTokenRefreshedAt) {
        storeToken(json.data.accessToken);
        return;
      }

      setProfile(json.data);

    } catch (error) {
      console.error(error);
      navigate('/error');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

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
                  <h3><i className="fa fa-user"></i> <span>이름</span></h3>
                  <span>{profile?.name}</span>
                </li>
                <li>
                  <h3><i className="fa fa-cake-candles"></i> <span>생년월일</span></h3>
                  <span>{profile?.birth}</span>
                </li>
                <li>
                  <h3><i className="fa fa-house"></i> <span>거주지</span></h3>
                  <span>{profile?.district}</span>
                </li>
                <li>
                  <h3><i className="fa fa-location-dot"></i> <span>연락처</span></h3>
                  <span>{profile?.phone}</span>
                </li>
                <li>
                  <h3><i className="fa fa-envelope"></i> <span>이메일</span></h3>
                  <span>{profile?.email}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h3><i className="fa fa-blog"></i> <span>블로그</span></h3>
                  <span><a href={profile?.blog} target="_blank">{profile?.blog}</a></span>
                </li>
                <li>
                  <h3><i className="fa-brands fa-github"></i> <span>GitHub</span></h3>
                  <span><a href={profile?.link2} target="_blank">{profile?.link2}</a></span>
                </li>
                <li>
                  <h3><i className="fa-brands fa-youtube"></i> <span>YouTube</span></h3>
                  <span><a href={profile?.link3} target="_blank">{profile?.link3}</a></span>
                </li>
                <li>
                  <h3><i className="fa-brands fa-instagram"></i> <span>Instagram</span></h3>
                  <span><a href={profile?.link1} target="_blank">{profile?.link1}</a></span>
                </li>
              </ul>
              <div>
                <h3><i className="fa fa-pen-nib"></i> <span>자기소개</span></h3>
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
