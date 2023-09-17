import React from 'react';
import LayoutAccount from '../../../layout/LayoutAccount';

import '../../../assets/css/account/educations.css';

const EducationList = () => {
  return (
    <LayoutAccount>
      <div class="educations">
                <div class="content-inner">
                    <div class="content-header">
                        <h2>학력</h2>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-12">
                            <div class="edu-col">
                                <span>2016.3 <i>~</i> 2022.2</span>
                                <h3>단국대학교 / 응용컴퓨터공학과</h3>
                                <p>이학사</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="edu-col">
                                <span>2020.9 <i>~</i> 2021.4</span>
                                <h3>체코 오스트라바 공과대학 / 컴퓨터공학 전공</h3>
                                <p>교환학생</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="edu-col">
                                <span>2013.3 <i>~</i> 2016.2</span>
                                <h3>천안 북일여자고등학교</h3>
                                <p>졸업</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </LayoutAccount>
  );
};

export default EducationList;