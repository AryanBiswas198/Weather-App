import React, { useState, useEffect } from "react";
import axios from "axios";
import PartlyCloud from "../assets/PartlyCloudy.png";
import Vector from "../assets/Vector.png";
import ThreeDots from "../assets/ThreeDots.png";
import Modal from "./Modal";

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstBox, setFirstBox] = useState(false);
  const [secondBox, setSecondBox] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data: ", error.response);
      setError("Failed to fetch weather data");
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
      <div
        className="w-full bg-opacity-10 bg-white py-3 flex justify-between items-center px-16 shadow-md"
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex items-center gap-x-4">
          <img
            src={PartlyCloud}
            alt="Weather Icon"
            className="w-16 h-16 mr-2"
          />
          <span className="text-xl font-poppins tracking-wider text-white">
            Weather by Aryan
          </span>
        </div>
        <div className="flex items-center  gap-x-4">
          <a
            href="https://github.com/yourgithubusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl font-poppins tracking-widest mr-4"
          >
            Github
          </a>
          <a
            href="/about"
            className="text-white text-xl font-poppins tracking-widest"
          >
            About
          </a>
        </div>
      </div>

      <div className=" mx-auto my-auto gap-x-16 flex items-center justify-center">
        {!firstBox ? (
          <div className="h-96 w-80 gap-y-2 flex flex-col justify-center items-center my-auto mx-auto border border-black rounded-3xl">
            <button onClick={openModal}>
              <div className="w-24 h-24 rounded-full flex justify-center items-center bg-opacity-50 bg-slate-100">
                <img src={Vector} alt="Plus Icon" className="w-16 h-16" />
              </div>
            </button>
            <h1 className="text-white text-xl pt-3 text-poppins tracking-wider ">
              Add New Location
            </h1>
            <h1 className="text-white text-xl">OR</h1>
            <button
              onClick={() => {
                setFirstBox(true);
                handleAllowLocation();
              }}
              className="bg-white text-black font-semibold px-4 py-2 rounded ml-0 md:ml-2 mt-2 md:mt-0"
            >
              Allow Location Access
            </button>
          </div>
        ) : (
          <div className="h-96 w-80 border border-black rounded-3xl">
            {loading && (
              <p className="text-center items-center font-semibold text-3xl">
                Loading...
              </p>
            )}
            {error && <p>{error}</p>}
            {weatherData && (
              <div className="flex flex-col justify-center items-center text-center pb-10">
                <button onClick={openModal} className="flex justify-end w-full">
                    <img src={ThreeDots} alt="Image" className=" mr-3 mt-4" />
                </button>
                <div className="flex flex-row gap-x-4 items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="h-20"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white">
                      Weather in {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <p className="text-md text-left text-white">
                      Date:{" "}
                      {new Date(weatherData.dt * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center py-10 gap-y-2">
                  <div className="flex flex-row mx-auto">
                    <span className="text-6xl text-white">
                      {weatherData.main.temp}
                    </span>
                    <p className="text-2xl text-white">°C</p>
                  </div>

                  <p className="text-sm text-white">
                    {weatherData.weather[0].description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-y-4 text-white">
                  <div className="flex flex-row gap-x-3">
                    <p>Visibility: {weatherData.visibility} m</p>
                    <p>|</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                  </div>

                  <div className="flex flex-row gap-x-3">
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                    <p>|</p>
                    <p>Feels Like: {weatherData.main.feels_like}°C</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!secondBox ? (
          <div className="h-96 w-80 gap-y-2 flex flex-col justify-center items-center my-auto mx-auto border border-black rounded-3xl">
            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-opacity-50 bg-slate-100">
              <img src={Vector} alt="Plus Icon" className="w-16 h-16" />
            </div>
            <h1 className="text-white text-xl pt-3 text-poppins tracking-wider ">
              Add New Location
            </h1>
            <h1 className="text-white text-xl">OR</h1>
            <button
              onClick={() => {
                setSecondBox(true);
                handleAllowLocation();
              }}
              className="bg-white text-black font-semibold px-4 py-2 rounded ml-0 md:ml-2 mt-2 md:mt-0"
            >
              Allow Location Access
            </button>
          </div>
        ) : (
          <div className="h-96 w-80 border border-black rounded-3xl">
            {loading && (
              <p className="text-center items-center font-semibold text-3xl">
                Loading...
              </p>
            )}
            {error && <p>{error}</p>}
            {weatherData && (
              <div className="flex flex-col justify-center items-center text-center pb-10">
                <div className="flex justify-end w-full">
                  <img src={ThreeDots} alt="Image" className=" mr-3 mt-4" />
                </div>
                <div className="flex flex-row gap-x-4 items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="h-20"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white">
                      Weather in {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <p className="text-md text-left text-white">
                      Date:{" "}
                      {new Date(weatherData.dt * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center py-10 gap-y-2">
                  <div className="flex flex-row mx-auto">
                    <span className="text-6xl text-white">
                      {weatherData.main.temp}
                    </span>
                    <p className="text-2xl text-white">°C</p>
                  </div>

                  <p className="text-sm text-white">
                    {weatherData.weather[0].description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-y-4 text-white">
                  <div className="flex flex-row gap-x-3">
                    <p>Visibility: {weatherData.visibility} m</p>
                    <p>|</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                  </div>

                  <div className="flex flex-row gap-x-3">
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                    <p>|</p>
                    <p>Feels Like: {weatherData.main.feels_like}°C</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* <div className="flex flex-col justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
            className="border border-gray-300 p-2 mb-2"
          />
          <div className="flex flex-row gap-x-6 py-4 justify-center items-center">
            <button
              onClick={handleLocationSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Get Weather
            </button>
            <button
              onClick={handleAllowLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-0 md:ml-2 mt-2 md:mt-0"
            >
              Allow Location Access
            </button>
          </div>
        </div>
        {loading && (
          <p className="text-center font-semibold text-3xl">Loading...</p>
        )}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="mt-4 flex flex-col justify-center items-center text-center py-10">
            <h2 className="text-3xl my-4 font-semibold">
              Weather in {weatherData.name}, {weatherData.sys.country}
            </h2>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
            <p className="text-2xl my-2">{weatherData.main.temp}°C</p>
            <p className="text-2xl">{weatherData.weather[0].description}</p>
            <p>Visibility: {weatherData.visibility} meters</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} m/s</p>
            <p>Feels Like: {weatherData.main.feels_like}°C</p>
          </div>
        )}

        {forecastData && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Next 7 days forecast:
            </h2>
            <div className="grid grid-cols-7 gap-4">
              {forecastData.list
                .filter((item, index) => index % 8 === 0)
                .map((item, index) => (
                  <div key={index} className="text-center">
                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <p>{item.weather[0].description}</p>
                    <p>{item.main.temp}°C</p>
                  </div>
                ))}
            </div>
          </div>
        )} */}
      </div>
      {showModal && <Modal setShowModal={setShowModal} fetchWeather={fetchWeather} fetchForecast={fetchForecast} location={location} setLocation={setLocation} setFirstBox={setFirstBox}  />}
    </div>
  );
}

export default HomePage;
