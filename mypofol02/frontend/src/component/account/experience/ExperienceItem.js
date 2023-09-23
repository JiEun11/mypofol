import React from "react";
// import '../../../assets/css/component/account/Experiences.css'; --여기는 이거 import 안 해도 되는거 맞죠?

const Experience = ({experience}) => {
  return (
    <div className="col-md-12">
      <div className="exp-col">
        <span>
          {experience.fromDate} <i>~</i>
          {experience.toDate}
        </span>
        <h3>{experience.description}</h3>
        <h4>{experience.title}</h4>
        <h5>{experience.description}</h5>
      </div>
    </div>
  );
};

export default Experience;
