import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LayoutAccount from '../../../layout/LayoutAccount';
import ExperienceItem from './ExperienceItem';

import '../../../assets/css/component/account/Experiences.css';


function Experiences() {
  const { accountName } = useParams();
  const [experiences, setExperiences] = useState(null);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`/api/${accountName}/experiences`, {
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

      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setExperiences(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchExperiences();
  }, []);

  return (
    <LayoutAccount >
      <div className="experiences">
                <div className="content-inner">
                    <div className="content-header">
                        <h2>경력</h2>
                    </div>
                    <div className="row align-items-center">
                      {experiences && experiences.map((experience) => (
                        <ExperienceItem key={experience.id} experience={experience} />
                      ))}
                    </div>
                </div>
            </div>
    </LayoutAccount>
  );
}

export default Experiences;