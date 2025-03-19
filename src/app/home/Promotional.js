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
    <section className="flex flex-col items-center mt-[50px]">
      <div className="flex flex-col justify-center">
        <h1 className="font-poppins text-[25px] md:text-[40px] font-bold text-center py-5">
          Our Promotional Videos
        </h1>
        <p className="text-[16px] md:text-[20px] font-quicksand font-normal text-[#62605b] text-center md:w-[45%] m-auto">
          Online classes with teachers, continuous questions and answers during
          class if you do not understand. At the end of the session, the lesson
          is recorded for your child to review
        </p>
        <button className="primary-btn font-quicksand max-w-[500px] bg-[#FE8840] text-white my-5 px-[40px] py-3 rounded-[25px] cursor-pointer transition mx-auto">
          Free Trial Lessons
        </button>
        <div className="relative md:w-[70%] m-auto">
          
          <img
            className="absolute top-[-23%] right-[-15%] w-[30%] h-auto p-2 rounded-xl z-[-1]"
            src="/images/videoimg.png"
            alt="Acces"
          />

          <video
            ref={videoRef}
            className="w-full border-[7px] border-[#FE8840] rounded-[20px] z-[1]" // Video in front of the image
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
      </div>

      <div className="flex flex-col sm:flex-row gap-5 py-3 mb-[50px]">
        <div className="flex flex-row items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-3 rounded-3xl">
          <img
            className="bg-[#F8F2FF] p-2 rounded-xl mr-2"
            src="/images/live.png"
            alt="Acces"
          />
          <h1 className="text-[22px] font-bold text-center items-center flex pr-[50px] font-poppins ">
            Live Classes
          </h1>
        </div>
        <div className="flex flex-row shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-3 rounded-3xl">
          <img
            className="bg-[#E5FFF3] p-3 rounded-[20px] mr-2"
            src="/images/recorded.png"
            alt="Acces"
          />
          <h1 className="text-[22px] font-bold text-center items-center flex pr-[50px] font-poppins ">
            Recorded Class
          </h1>
        </div>
        <div className="flex flex-row items-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-3 rounded-3xl">
          <img
            className="bg-[#FFF4F2] p-3 rounded-[30px] mr-2"
            src="/images/audio.png"
            alt="Acces"
          />
          <h1 className="text-[22px] font-bold text-center items-center flex pr-[50px] font-poppins ">
            Audio Classes
          </h1>
        </div>
      </div>
    </section>
  );
};
