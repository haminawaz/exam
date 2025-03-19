"use client";
import React, { useRef, useState } from "react";

export const Promotional = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <section className="flex flex-col py-3 items-center my-[50px]">
      <h1 className="font-poppins text-[25px] md:text-[40px] font-bold text-center py-5">
        De la préparation à la réussite: suivez notre guide!
      </h1>
      <div className="relative md:w-[70%] m-auto">
        <img
          className="absolute top-[-23%] right-[-15%] w-[30%] h-auto p-2 rounded-xl z-[-1]"
          src="/images/videoimg.png"
          alt="Acces"
        />

        <video
          ref={videoRef}
          className="w-full border-[7px] border-[#FE8840] rounded-[20px] z-[1]"
          controls
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl font-bold w-16 h-16 rounded-full transition-opacity duration-300 hover:bg-black/70 flex items-center justify-center"
            onClick={handlePlay}
          >
            ▶
          </button>
        )}
      </div>
    </section>
  );
};
