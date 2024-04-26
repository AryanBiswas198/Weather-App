import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Modal({
  setShowModal,
  fetchWeather,
  fetchForecast,
  location,
  setLocation,
  setFirstBox,
  setSecondBox,
  handleAllowLocation,
  isFirstBox,
  setIsFirstBox,
  isSecondBox,
  setIsSecondBox,
}) {
  useEffect(() => {
    if (localStorage.getItem("location")) {
      fetchWeather(localStorage.getItem("location"));
      fetchForecast(localStorage.getItem("location"));
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationSubmit = () => {
    localStorage.setItem("location", location);
    fetchWeather(location);
    fetchForecast(location);
    // setFirstBox(true);
    if(isFirstBox === true){
      setFirstBox(true);
      setIsFirstBox(false);
    }
    else{
      setSecondBox(true);
      setIsSecondBox(false);
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-70 flex flex-col justify-center items-center">
      <div
        className="border border-black rounded-lg p-8 relative  mx-auto"
        style={{
          background:
            "linear-gradient(45deg, rgba(132,179,189,1) 21%, rgba(174,157,218,1) 33%, rgba(161,125,196,1) 49%, rgba(101,117,195,1) 83%, rgba(161,101,232,1) 100%)",
        }}
      >
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Get Weather
        </h1>
        <input
          type="text"
          placeholder="Enter location"
          className="border border-black rounded-2xl px-4 p-2 mb-4 w-full"
          onChange={handleLocationChange}
        />
        <div className="flex flex-row gap-x-10">
          <button
            className="bg-white mx-auto text-black px-4 py-2 rounded-xl font-semibold"
            onClick={handleLocationSubmit}
          >
            Get Weather
          </button>

          <button
            className="bg-white mx-auto text-black px-4 py-2 rounded-xl font-semibold"
            onClick={handleAllowLocation}
          >
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
