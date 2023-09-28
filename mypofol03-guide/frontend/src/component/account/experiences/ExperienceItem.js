import React from "react";

// import '../../../assets/css/component/account/Experiences.css'; --여기는 이거 import 안 해도 되는거 맞죠? 안해도 되지만 분리 시켜서 컴포넌트 별로 css 가지는 게 조치!! 해논거 바바
import '../../../assets/css/component/account/experiences/ExperienceItem.css';

const Experience = ({ experience }) => {
  return (
    <div className="col-md-12">
      <div className="exp-col">
        <span>
          {experience.fromDate} <i>~</i>
          {experience.toDate}
        </span>
        <h3>{experience.company}</h3>
        <h4>{experience.title}</h4>
        <h5>{experience.description}</h5>
      </div>
    </div>
  );
};

export default Experience;
