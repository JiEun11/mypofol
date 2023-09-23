import React from 'react';

import LayoutAccount from "../../../layout/LayoutAccount";
import '../../../assets/css/component/account/Projects.css';

const index = () => {
  return (
    <LayoutAccount>
      <div class="projects">
                <div class="content-inner">
                    <div class="content-header">
                        <h2>프로젝트</h2>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-12">
                            <div class="prj-col">
                                <span>2023.10<i>~</i> 2023.12</span>
                                <h3>Mypofol</h3>
                                <h4>Project Manager</h4>
                                <p>
                                    Mypofol 짱
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </LayoutAccount>
  );
};

export default index;