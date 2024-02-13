import React from "react";
import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
import Subscription from "../../components/Subscription/Subscription";


const Home = ({ slideIn,theme,handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme} />
      <div className={`home-container-2 ${theme}`} style={{marginTop:"3rem"}}>
        <HomeMainbar theme={theme} />
        <RightSidebar theme={theme} />
        <Subscription theme={theme}/>
      </div>
    </div>
  );
};

export default Home;
