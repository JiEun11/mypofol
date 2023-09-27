import React from "react";

const Education = ({ education }) => {
  return (
    <div className="col-md-12">
      <div className="edu-col">
        <span>
          {education.fromDate}<i>~</i>{education.toDate}
        </span>
        <h3>{education.title}</h3>
        <p>{education.degrees}</p>
      </div>
    </div>
  );
};

export default Education;
