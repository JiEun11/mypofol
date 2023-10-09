import React from "react";

const LanguageItem = ({ training }) => {
  return (
    <li>
      <span>{training.title}</span>
      <span>{training.awarded}</span>
      <span>{training.description}</span>
    </li>
  );
};

export default LanguageItem;
