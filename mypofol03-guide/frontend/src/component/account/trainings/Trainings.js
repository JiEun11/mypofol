import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LayoutAccount } from '../../../layout';
import CertificateItem from "./CertificateItem";
import EducationItem from './EducationItem';
import LanguageItem from './LanguageItem';
import '../../../assets/css/component/account/Trainings.css';

const Trainings = () => {
  const { accountName } = useParams();
  const [trainings, setTrainings] = useState(null);

  const fetchTrainings = async () => {
    try {
      const response = await fetch(`/api/${accountName}/trainings`, {
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
      setTrainings(json.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

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
                  {trainings && trainings.map((training) => training.type === "education"
                    ? <EducationItem key={training.id} training={training} /> : null)}
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
                  {trainings && trainings.map((training) => training.type === "certificate"
                    ? <CertificateItem key={training.id} training={training} /> : null)}
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
                  {trainings && trainings.map((training) => training.type === "language"
                    ? <LanguageItem key={training.id} training={training} /> : null)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
};

export default Trainings;