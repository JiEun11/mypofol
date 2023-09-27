import React from "react";

const EducationItem = ({ training }) => {
  return (
    <li>
      <span>{training.title}</span>
      <span>{training.awarded}</span>
      <span>{training.description}</span>
    </li>
  );
};

export default EducationItem;
