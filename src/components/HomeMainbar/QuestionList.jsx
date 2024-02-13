import React from "react";
import Questions from "./Questions";
const QuestionList = ({ questionsList,theme }) => {
  return (
    <>
      {questionsList.map((question) => (
        <Questions question={question} key={question._id} theme={theme} />
      ))}
    </>
  );
};

export default QuestionList;
