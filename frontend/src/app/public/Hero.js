"use client";

import React from "react";

export const Hero = ({ activeSection }) => {
  return (
    <div>
      <img
        src="/images/herosection_bgtop.png"
        alt="Farrukh"
        className="w-[100%]"
      />
      <div className="flex flex-col md:flex-row gap-5 max-w-[75%] mx-auto justify-center mb-[-60px]">
        {activeSection == "products" ? (
          <>
            <div className="md:w-[70%] flex items-center">
              <h1 className="font-bold text-[30px] md:text-[50px] font-quicksand items-center">
                Payment Details
              </h1>
            </div>
            <div className="md:w-[30%]">
              <img src="/images/hero_one.png" alt="Farrukh" className="" />
            </div>
          </>
        ) : activeSection == "choose-avatar" ? (
          <>
            <div className="md:w-[55%] flex items-center">
              <h1 className="font-bold text-[30px] md:text-[50px] font-quicksand items-center">
                Choose Your Favorite Avatar
              </h1>
            </div>
            <div className="md:w-[30%]">
              <img src="/images/hero_one.png" alt="Farrukh" className="" />
            </div>
          </>
        ) : activeSection == "access-simulator" ? (
          <>
            <div className="md:w-[70%] flex items-center">
              <h1 className="font-bold text-[30px] md:text-[50px] font-quicksand items-center">
                Child Access
              </h1>
            </div>
            <div className="md:w-[30%]">
              <img src="/images/hero_one.png" alt="Farrukh" className="" />
            </div>
          </>
        ) : activeSection == "quiz" ? (
          <>
            <div className="md:w-[70%] flex items-center">
              <h1 className="font-bold text-[30px] md:text-[50px] font-quicksand items-center">
                Let’s Explore Acces-Sec’s Simulator
              </h1>
            </div>
            <div className="md:w-[30%]">
              <img src="/images/hero_one.png" alt="Farrukh" className="" />
            </div>
          </>
        ) : (
          <>
            <div className="md:w-[70%] ">
              <h1 className="font-bold font-quicksand text-[30px] md:text-[50px] font-quicksand md:text-left text-center">
                Le chemin vers le secondaire commence ici !
              </h1>
              <p className="!font-normal font-quicksand text-[18px] md:text-[26px] md:text-left text- text-[#1F1C14]">
                Avec Acess-Sec, sois prêt à 100% pour réussir tes examens
                d'accès au secondaire .
              </p>
              <div className="flex flex-row items-center my-5">
                <p className="text-[14px] font-normal text-[#0D1216] font-quicksand md:text-left text-center">
                  4.8/5.0
                </p>
                <img src="/images/rating_star.png" alt="Farrukh" className="" />
                <p className="text-[14px] font-normal text-[#0D1216] font-quicksand md:text-left text-center">
                  Based on 2000 reviews
                </p>
              </div>
            </div>
            <div className="md:w-[30%]">
              <img src="/images/hero_one.png" alt="Farrukh" className="" />
            </div>
          </>
        )}
      </div>
      <img
        src="/images/herosection_bgbottom.png"
        alt="Farrukh"
        className="w-[100%]"
      />
    </div>
  );
};
