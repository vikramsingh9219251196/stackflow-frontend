import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import axios from "axios";
import Chatbot from "./components/Chatbot/Chatbot";
import { Route,Routes } from "react-router-dom";
import OTPForm from "./components/otpform/OtpForm";


function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');
  const [slideIn, setSlideIn] = useState(true);
  useEffect(() => {
    const fetchWeatherAndSetTheme = async () => {
      try {
        const position = await getCurrentLocation();
        const currentTime = getCurrentTime();
        const weatherData = await getWeatherData(position.coords.latitude, position.coords.longitude);
        const newTheme = determineTheme(currentTime, weatherData);
        console.log(currentTime);
        console.log(position)
        setTheme(newTheme);
      } catch (error) {
        console.error('Error fetching location or weather data:', error);
      }
    };
  
    fetchWeatherAndSetTheme();
  }, []);

  useEffect(() => {
    console.log('Current Theme:', theme);
  }, [theme]);


  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };
  

 
  const getCurrentTime = () => {
    return new Date().getHours();
  };


  const getWeatherData = async (latitude, longitude) => {
    const response = await axios.get(`/api/weather/${latitude}/${longitude}`); 
    console.log('Weather Data:', response.data);
    return response.data; 
  };
 const determineTheme = (currentTime, weatherData) => {
  const isDaytime = currentTime >= 6 && currentTime < 18;

  // Check if weatherData is defined and has a conditions property
  const isClearSky = weatherData && weatherData.conditions &&
    (weatherData.conditions.toLowerCase() === 'mist' ||
    weatherData.conditions.toLowerCase() === 'few clouds' ||
    weatherData.conditions.toLowerCase() === 'clear sky' ||
    weatherData.conditions.toLowerCase() === 'broken clouds' ||
    weatherData.conditions.toLowerCase() === 'haze');

  console.log('Is Daytime:', isDaytime);
  console.log('Is Clear Sky:', isClearSky);
  return isDaytime && isClearSky ? 'light' : 'dark';
};
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch])

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className={`App app-container ${theme}`}>
      <Router >
        <Navbar handleSlideIn={handleSlideIn} theme={theme}  />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} theme={theme}   />
        <Routes>
          <Route path="/chatbot" element={<Chatbot/>}/>
          <Route path="/otpverify" element={<OTPForm/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
