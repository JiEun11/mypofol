import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LayoutAccount from "../../../layout/LayoutAccount";
import '../../../assets/css/component/account/Skills.css';

const index = () => {

  const { accountName } = useParams();
  const [skills, setSkills] = useState(null);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`/api/${accountName}/skills`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: null,
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      console.log('json >> ' , json);
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setSkills(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchSkills();
  }, []);

  return (
    <LayoutAccount>
      <div className="skills">
                <div className="content-inner">
                    <div className="content-header">
                        <h2>주요기술</h2>
                    </div>
                    <div className="row align-items-top">

                        <div className="col-md-6">
                            <div className="skills-col">
                                <h3>
                                    <i className="fa fa-ellipsis-vertical"></i>
                                    <span>BackEnd</span>
                                </h3>
                                <div className="skillsets">
                                    <div className="skill-name">
                                        <p>Java / Spring</p>
                                        <p>Lvl.3</p>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{width:(3/5)*100}}></div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
    </LayoutAccount>
  );
};

export default index;