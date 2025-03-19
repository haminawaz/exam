"use client";
import React, { useState } from "react";

const avatars = [
  "/images/choose-avatar/girl_11.png",
  "/images/choose-avatar/boy 16.png",
  "/images/choose-avatar/girl_13.png",
  "/images/choose-avatar/boy_17.png", 
  "/images/choose-avatar/girl_14.png",
  "/images/choose-avatar/girl_15.png",
  "/images/choose-avatar/boy_13.png",
  "/images/choose-avatar/Girl_08.png",
  "/images/choose-avatar/Boy_01.png",
  "/images/choose-avatar/boy_11.png",
];
export default function page() {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  

  return (
    <section className="bg-[#f9f9f9] pb-5">
      <div className="bg-[#fff3e9] md:w-[70%] lg:w-[50%] m-auto ">
        <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-[#000000] text-center py-5">
          Welcome Student!
        </h1>
        <div className="bg-white mx-[40px] md:mx-[100px] m-auto p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] pb-[50px]">
          <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-5">
            Choose your favorite avatar
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-24 h-24 cursor-pointer  hover:border-gray-500 transition"
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
          </div>
          <p className="text-[16px] font-quicksand font-bold text-[#000000] text-center py-2 pt-5">
            Choose your Nick Name
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={name ? "" : "Emile"}
            className="w-full h-12 px-4 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] text-center placeholder:text-center focus:outline-none"
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <img src={selectedAvatar} alt="Farrukh" className="" />
            <p className="text-[14px] font-quicksand font-bold text-[#000000] text-center">
              Wohoo! Emile Your Profile has been updated
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
