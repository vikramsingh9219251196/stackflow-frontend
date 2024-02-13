import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import QuestionsDetails from "./QuestionsDetails";

const DisplayQuestion = ({ slideIn, handleSlideIn,theme }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />
      <div className={`home-container-2${theme}`}>
        <QuestionsDetails theme={theme} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
