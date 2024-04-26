import React from "react";
import { Link } from "react-router-dom";
import ThinkMemoji from "../assets/LoginMemoji.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="bg-richblack-900 flex flex-col md:flex-row items-center justify-center gap-x-0 md:gap-x-20 p-8 md:p-12 rounded-2xl w-full md:max-w-4xl shadow-lg-purple">
        <img src={ThinkMemoji} alt="Think Memoji" className="w-64 mb-8 md:mb-0" />
        <div className="text-white flex items-center">
          <p className="text-white font-semibold font-poppins tracking-wide text-xl text-center md:text-left">
            Hey there, myself Aryan Biswas, and I am passionate about
            problem-solving and developing cool applications using the MERN
            Stack (MongoDB, Express, React, Node.js). <br /> <br />
            If you are interested in hiring me or interviewing me, please feel
            free to reach out. I am always open to exciting opportunities!
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-12 md:items-center">
        <Link
          to="/"
          className="w-full md:w-32 px-3 py-2 border border-black text-white font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out flex justify-center items-center"
          style={{
            background: "linear-gradient(to right, #667EEA, #764BA2)",
            backgroundSize: "200% auto",
            backgroundPosition: "right center",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundPosition = "right center")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundPosition = "left center")
          }
        >
          Go Back
        </Link>

        <a
          href="your-google-drive-link-here"
          className="w-full md:w-32 px-3 py-2 border border-black text-white font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out flex justify-center items-center"
          style={{
            background: "linear-gradient(to right, #667EEA, #764BA2)",
            backgroundSize: "200% auto",
            backgroundPosition: "right center",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundPosition = "right center")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundPosition = "left center")
          }
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export default About;
