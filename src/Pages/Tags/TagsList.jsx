import React from "react";
import "./Tags.css";

const TagsList = ({ tag,theme }) => {
  return (
    <div className={`tag${theme}`}>
      <h5>{tag.tagName}</h5>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default TagsList;
