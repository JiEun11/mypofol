import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import { useAuthContext } from '../../../auth';
import LayoutAccount from '../../../layout/LayoutAccount';
import ExperienceItem from './ExperienceItem';

import '../../../assets/css/component/account/experiences/index.css';

function Experiences() {
  const [experiences, setExperiences] = useState(null);

  const { token, storeToken } = useAuthContext();
  const { accountName } = useParams();
  const navigate = useNavigate();

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`/api/${accountName}/experiences`, {
        method: "get",
        headers: {
          'Authorization': `bearer ${token}`,          
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
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
      navigate('/error');
    }
  }

  useEffect(() => {
    fetchExperiences();
  }, [token]);

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