import React from "react";
import assets from "../assets/assets";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-999">
      <img
        src={assets.Logo}
        alt="Netflix Logo"
        className="w-36 md:w-44 animate-pulse"
      />
    </div>
  );
};

export default LoadingScreen;