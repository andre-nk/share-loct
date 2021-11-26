import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineCamera } from "react-icons/ai";

export default function Landing() {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <div className="w-full h-screen overflow-hidden">
        <img src="/stamp.png" alt="stamp" className="hidden lg:block absolute left-0 bottom-12 h-44"/>
        <div className="flex flex-col lg:flex-row w-full h-full lg:h-96 items-center justify-between absolute top-20">
          <div className="mx-8 md:mx-16 flex flex-col items-center lg:block lg:ml-40 mt-12">
            <h2 className="text-2xl lg:text-4xl font-serif font-bold">
              Explore new places
            </h2>
            <p className="mt-4 text-center text-md md:text-lg lg:text-left">
              Visit your <span className="font-semibold">magical</span> hidden
              place... <br className="hidden lg:block" />
              snap and share to everyone around the world!
            </p>
            <button className="flex mt-8 items-center h-12">
              <div className="bg-black-main h-full flex items-center justify-center px-3.5">
                <AiOutlineCamera className="text-2xl text-white-main" />
              </div>
              <div className="bg-secondary-light text-black-main font-medium h-full flex items-center px-6 justify-center">
                Start exploring
              </div>
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="landing-decoration.png"
              alt="landing-decoration"
              className="absolute hidden lg:block right-0 bottom-10 h-80 lg:mt-0 lg:top-8 lg:h-135"
            />
            <img
              src="landing-decoration-sm.png"
              alt="landing-decoration"
              className="absolute sm:block lg:hidden bottom-12 h-80 lg:h-135"
            />
          </div>
        </div>
        <svg
          width={window.screen.width}
          height={window.screen.height / 1.95}
          viewBox={`0 0 ${window.screen.width} ${window.screen.height / 1.95}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M1440 633.247L0 ${window.screen.height}V0H${window.screen.width}V633.247Z`}
            fill="#F1FCF8"
          />
        </svg>
      </div>
    );
  } else {
    return <div></div>;
  }
}
