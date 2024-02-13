import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Questions = ({ slideIn, handleSlideIn,theme }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className={`home-container-2${theme}`}>
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Questions;
