import React, { useState, useEffect } from "react";
import axios from "axios";
import PartlyCloud from "../assets/PartlyCloudy.png";
import Vector from "../assets/Vector.png";
import ThreeDots from "../assets/ThreeDots.png";
import Modal from "./Modal";
import Navbar from "./Navbar";

function HomePage() {
  // const [weatherData, setWeatherData] = useState(null);
  const [firstBoxWeatherData, setFirstBoxWeatherData] = useState(null);
  const [secondBoxWeatherData, setSecondBoxWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstBox, setFirstBox] = useState(false);
  const [secondBox, setSecondBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFirstBox, setIsFirstBox] = useState(false);
  const [isSecondBox, setIsSecondBox] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("location")) {
      fetchWeather(localStorage.getItem("location"));
      fetchForecast(localStorage.getItem("location"));
    }
  }, []);

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      let response;
      if (typeof location === "string") {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            location
          )}&appid=3ec25b1219869d9ac5659474d83bb154&units=metric`
        );
      } else {
        const { latitude, longitude } = location;
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3ec25b1219869d9ac5659474d83bb154&units=metric`
        );
      }
      // setWeatherData(response.data);
      if(isFirstBox){
        setFirstBoxWeatherData(response.data);
      }
      else{
        setSecondBoxWeatherData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data: ", error.response);
      // setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const fetchForecast = async (location) => {
    try {
      let response;
      if (typeof location === "string") {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            location
          )}&appid=3ec25b1219869d9ac5659474d83bb154&units=metric`
        );
      } else {
        const { latitude, longitude } = location;
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3ec25b1219869d9ac5659474d83bb154&units=metric`
        );
      }
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast data: ", error.response);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationSubmit = () => {
    localStorage.setItem("location", location);
    fetchWeather(location);
    fetchForecast(location);
  };

  const handleAllowLocation = () => {
    setShowModal(false);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather({ latitude, longitude });
      fetchForecast({ latitude, longitude });
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center text-poppins tracking-wider"
      style={{
        background:
          "linear-gradient(45deg, rgba(132,179,189,1) 21%, rgba(174,157,218,1) 33%, rgba(161,125,196,1) 49%, rgba(101,117,195,1) 83%, rgba(161,101,232,1) 100%)",
      }}
    >
      {/* Code For Navbar */}
      <Navbar />

      <div className=" mx-auto my-auto gap-x-16 flex items-center justify-center">
        {!firstBox ? (
          <div className="h-96 w-80 gap-y-2 flex flex-col justify-center items-center my-auto mx-auto border border-black rounded-3xl shadow-2xl bg-opacity-20 bg-black">
            <button onClick={() => {
              setIsFirstBox(true);
              openModal();
            }}>
              <div className="w-24 h-24 rounded-full flex justify-center items-center bg-opacity-50 bg-slate-100">
                <img src={Vector} alt="Plus Icon" className="w-12 h-12" />
              </div>
            </button>
            <h1 className="text-white text-xl pt-3 font-poppins font-semibold tracking-wider ">
              Add New Location
            </h1>
            <h1 className="text-white font-poppins font-semibold text-xl">OR</h1>
            <button
              onClick={() => {
                setFirstBox(true);
                handleAllowLocation();
              }}
              className="bg-white text-black font-semibol px-4 py-2 rounded-2xl ml-0 md:ml-2 mt-2 md:mt-4"
            >
              Allow Location Access
            </button>
          </div>
        ) : (
          <div className="h-96 w-80 border border-black rounded-3xl shadow-2xl bg-opacity-20 bg-black">
            {loading && (
              <p className="text-center items-center font-semibold text-3xl">
                Loading...
              </p>
            )}
            {error && <p>{error}</p>}
            {firstBoxWeatherData && (
              <div className="flex flex-col justify-center items-center text-center pb-10">
                <button onClick={() => {
                  setIsFirstBox(true);
                  openModal();
                }} className="flex justify-end w-full">
                    <img src={ThreeDots} alt="Image" className=" mr-3 mt-4" />
                </button>
                <div className="flex flex-row gap-x-4 items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${firstBoxWeatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="h-20"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white">
                      Weather in {firstBoxWeatherData.name}, {firstBoxWeatherData.sys.country}
                    </h2>
                    <p className="text-md text-left text-white">
                      Date:{" "}
                      {new Date(firstBoxWeatherData.dt * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center py-10 gap-y-2">
                  <div className="flex flex-row mx-auto">
                    <span className="text-6xl text-white">
                      {firstBoxWeatherData.main.temp}
                    </span>
                    <p className="text-2xl text-white">°C</p>
                  </div>

                  <p className="text-sm text-white">
                    {firstBoxWeatherData.weather[0].description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-y-4 text-white">
                  <div className="flex flex-row gap-x-3">
                    <p>Visibility: {firstBoxWeatherData.visibility} m</p>
                    <p>|</p>
                    <p>Humidity: {firstBoxWeatherData.main.humidity}%</p>
                  </div>

                  <div className="flex flex-row gap-x-3">
                    <p>Wind: {firstBoxWeatherData.wind.speed} m/s</p>
                    <p>|</p>
                    <p>Feels Like: {firstBoxWeatherData.main.feels_like}°C</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!secondBox ? (
          <div className="h-96 w-80 gap-y-2 flex flex-col justify-center items-center my-auto mx-auto border border-black rounded-3xl shadow-2xl bg-opacity-20 bg-black">
            <button onClick={() => {
              setIsSecondBox(true);
              openModal();
            }}>
              <div className="w-24 h-24 rounded-full flex justify-center items-center bg-opacity-50 bg-slate-100">
                <img src={Vector} alt="Plus Icon" className="w-12 h-12" />
              </div>
            </button>
            <h1 className="text-white text-xl pt-3 font-poppins font-semibold tracking-wider ">
              Add New Location
            </h1>
            <h1 className="text-white font-poppins font-semibold text-xl">OR</h1>
            <button
              onClick={() => {
                setSecondBox(true);
                handleAllowLocation();
              }}
              className="bg-white text-black font-semibol px-4 py-2 rounded-2xl ml-0 md:ml-2 mt-2 md:mt-4"
            >
              Allow Location Access
            </button>
          </div>
        ) : (
          <div className="h-96 w-80 border border-black rounded-3xl shadow-2xl bg-opacity-20 bg-black">
            {loading && (
              <p className="text-center items-center font-semibold text-3xl">
                Loading...
              </p>
            )}
            {error && <p>{error}</p>}
            {secondBoxWeatherData && (
              <div className="flex flex-col justify-center items-center text-center pb-10">
                <button onClick={() => {
                  setIsSecondBox(true);
                  openModal();
                }} className="flex justify-end w-full">
                    <img src={ThreeDots} alt="Image" className=" mr-3 mt-4" />
                </button>
                <div className="flex flex-row gap-x-4 items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${secondBoxWeatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="h-20"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white">
                      Weather in {secondBoxWeatherData.name}, {secondBoxWeatherData.sys.country}
                    </h2>
                    <p className="text-md text-left text-white">
                      Date:{" "}
                      {new Date(secondBoxWeatherData.dt * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center py-10 gap-y-2">
                  <div className="flex flex-row mx-auto">
                    <span className="text-6xl text-white">
                      {secondBoxWeatherData.main.temp}
                    </span>
                    <p className="text-2xl text-white">°C</p>
                  </div>

                  <p className="text-sm text-white">
                    {secondBoxWeatherData.weather[0].description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-y-4 text-white">
                  <div className="flex flex-row gap-x-3">
                    <p>Visibility: {secondBoxWeatherData.visibility} m</p>
                    <p>|</p>
                    <p>Humidity: {secondBoxWeatherData.main.humidity}%</p>
                  </div>

                  <div className="flex flex-row gap-x-3">
                    <p>Wind: {secondBoxWeatherData.wind.speed} m/s</p>
                    <p>|</p>
                    <p>Feels Like: {secondBoxWeatherData.main.feels_like}°C</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && <Modal setShowModal={setShowModal} fetchWeather={fetchWeather} fetchForecast={fetchForecast} location={location} setLocation={setLocation} setFirstBox={setFirstBox} setSecondBox={setSecondBox} handleAllowLocation={handleAllowLocation} isFirstBox={isFirstBox} setIsFirstBox={setIsFirstBox} isSecondBox={isSecondBox}  setIsSecondBox={setIsSecondBox} />}
    </div>
  );
}

export default HomePage;
