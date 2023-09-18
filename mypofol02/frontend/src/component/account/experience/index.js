import React from 'react';

import LayoutAccount from '../../../layout/LayoutAccount';
import '../../../assets/css/component/account/Experiences.css';

function Experiences() {
  return (
    <LayoutAccount >
      <div className="experiences">
                <div className="content-inner">
                    <div className="content-header">
                        <h2>경력</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="exp-col">
                                <span>2022.6 <i>~</i> </span>
                                <h3>포스코 DX, Smart IT 사업실 포스코 IT 사업부, ERP 섹선</h3>
                                <h4>사원 / 정규직</h4>
                                <h5>Java 풀스택 개발 / 운영</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </LayoutAccount>
  );
}

export default Experiences;