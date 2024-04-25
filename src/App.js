import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen flex flex-col pt-20 items-center">
      <div className=" mx-auto p-4">
        <h1 className="text-5xl text-center font-bold mb-7">Weather App</h1>
        <div className="flex flex-col justify-center items-center mb-4">
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
        )}
      </div>
    </div>
  );
}

export default App;
