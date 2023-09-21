import React from "react";
import { useParams } from "react-router";

import LayoutAccount from '../../../layout/LayoutAccount';
import "../../../assets/css/component/account/Profile.css";

const Profile = () => {
  const { accountName } = useParams();

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
                      <span>김지은</span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa fa-cake-candles"></i>
                        <span>생년월일</span>
                      </h3>
                      <span>1997-12-11</span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa fa-house"></i>
                        <span>거주지</span>
                      </h3>
                      <span>경기도 성남시 중원구</span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa fa-location-dot"></i>
                        <span>연락처</span>
                      </h3>
                      <span>010-4761-6934</span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa fa-envelope"></i>
                        <span>이메일</span>
                      </h3>
                      <span>shdudtnr3939@gmail.com</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <h3>
                        <i className="fa fa-blog"></i>
                        <span>블로그</span>
                      </h3>
                      <span>
                        <a href="https://velog.io/@devbella" target="_blank">
                          https://velog.io/@devbella
                        </a>
                      </span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa-brands fa-github"></i>
                        <span>GitHub</span>
                      </h3>
                      <span>
                        <a href="https://github.com/JiEun11" target="_blank">
                          https://github.com/JiEun11
                        </a>
                      </span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa-brands fa-youtube"></i>
                        <span>YouTube</span>
                      </h3>
                      <span>
                        <a
                          href="https://www.youtube.com/channel/UCffzrqaHP8JB53GHuzmLMDw"
                          target="_blank">
                          https://www.youtube.com/channel/UCffzrqaHP8JB53GHuzmLMDw
                        </a>
                      </span>
                    </li>
                    <li>
                      <h3>
                        <i className="fa-brands fa-instagram"></i>
                        <span>Instagram</span>
                      </h3>
                      <span>
                        <a
                          href="https://www.instagram.com/bella___jin"
                          target="_blank">
                          https://www.instagram.com/bella___jin
                        </a>
                      </span>
                    </li>
                  </ul>
                  <div>
                    <h3>
                      <i className="fa fa-pen-nib"></i>
                      <span>자기소개</span>
                    </h3>
                    <p>
                      자유로운 개발자 문화에서 크리에이티브한 개발자로 성장하고
                      싶습니다.
                      <br />
                      자유로운 아이디어 공유를 통해 발전하는 개발자가 되고
                      싶습니다.
                      <br />
                      사람 좋아! 대화 좋아! 혼자 헤매지 말자! 소통하는 개발자,
                      인사드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="large-btn">
              <div>
                <a className="btn" href="#">
                  <i className="fa fa-download"></i>Resume
                </a>
                <a className="btn" href="#">
                  <i className="fa fa-hands-helping"></i>Hire Me
                </a>
              </div>
            </div>
          </div>
    </LayoutAccount>
  );
};

export default Profile;
