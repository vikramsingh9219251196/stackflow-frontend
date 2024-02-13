import React from "react";

const WidgetTags = ({theme}) => {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];

  return (
    <div className="widget-tags">
      <h4 className={`h4 ${theme}`}>Watched tags</h4>
      <div className="widget-tags-div">
        {tags.map((tag) => (
          <p className={`${theme}`} key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
