import React, { useEffect, useState } from 'react';
import EducationItem from './EducationItem';
import '../../../assets/css/account/educations/Educations.css';

const Educations = ({ accountName }) => {
  const [educations, setEducations] = useState(null);

  const fetchEducations = async () => {
    try {
      const response = await fetch(`/api/${accountName}/educations`, {
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
      setEducations(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <div className="educations">
      <div className="content-inner">
        <div className="content-header">
          <h2>학력</h2>
        </div>
        <div className="row align-items-center">
          {educations && educations.map((education) => (
            <EducationItem key={education.id} education={education} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Educations;