import React from 'react';
import LayoutAccount from "../../../layout/LayoutAccount";
import '../../../assets/css/component/account/Trainings.css';

const index = () => {
  return (
    <LayoutAccount>
      <div className="trainings">
        <div className="content-inner">
          <div className="content-header">
            <h2>교육 및 자격증</h2>
          </div>
          <div className="row align-items-top">
            <div className="col-md-12">
              <div className="training-col">
                <h3>
                  <i className="fa fa-award"></i>
                  <span>교육</span>
                </h3>
                <ul>
                  <li>
                    <span>포스코 청년 IT 아카데미</span>
                    <span>2022-05</span>
                    <span></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-12">
              <div className="training-col">
                <h3>
                  <i className="fa fa-certificate"></i>
                  <span>자격증</span>
                </h3>
                <ul>
                  <li>
                    <span>정보처리기사</span>
                    <span>2022-12</span>
                    <span></span>
                  </li>
                  <li>
                    <span>리눅스마스터</span>
                    <span>2018-09</span>
                    <span>2급</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-12">
              <div className="training-col">
                <h3>
                  <i className="fa fa-language"></i>
                  <span>외국어</span>
                </h3>
                <ul>
                  <li>
                    <span>OPIC</span>
                    <span>2021-06</span>
                    <span>레벨 IH</span>
                  </li>
                  <li>
                    <span>TOFEL</span>
                    <span>2020-02</span>
                    <span>73점</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
};

export default index;