import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => {
  return (
    <div className="flex items-center justify-start flex-1">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } sm:h-16 sm:w-16 w-14 h-14 sm:mr-4 mr-2 flex-shrink-0`}
      >
        <img
          src={activeSong?.thumbnail}
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="sm:w-[50%] w-40 truncate">
        <p className="md:text-lg md:font-bold text-white truncate text-base">
          {activeSong?.title ? activeSong?.title : "No active Song"}
        </p>
      </div>
    </div>
  );
};

export default Track;
