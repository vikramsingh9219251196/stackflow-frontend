import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";

const AllRoutes = ({ slideIn, handleSlideIn,theme}) => {
  return (
    <Routes >
      <Route 
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme}  />}
      />
      <Route path="/Auth" element={<Auth  theme={theme}/>} />
      <Route path="/AskQuestion" element={<AskQuestion theme={theme} />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
