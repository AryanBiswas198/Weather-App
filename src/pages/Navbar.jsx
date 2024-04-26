import React from "react";
import PartlyCloud from "../assets/PartlyCloudy.png"

const Navbar = () => {

    return(
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
    );
}

export default Navbar;