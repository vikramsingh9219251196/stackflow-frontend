import React from "react";
import "./RightSidebar.css";
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";

const RightSidebar = ({theme}) => {
  return (
    <aside className="right-sidebar">
      <Widget theme={theme} />
      <WidgetTags theme={theme} />
    </aside>
  );
};

export default RightSidebar;
