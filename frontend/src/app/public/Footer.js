import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <div className="bg-[#0772AA]">
        <div className="flex flex-col items-center m-auto py-[50px] gap-5">
          <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] ">
            <Link
              href="/quiz"
              className="text-[18px] md:text-[26px] font-quicksand font-normal text-white"
            >
              Simulation gratuite
            </Link>
            <Link
              href="/payment"
              className="text-[18px] md:text-[26px] font-quicksand font-normal text-white"
            >
              Commander un examen
            </Link>
            <Link
              href="#contact-us"
              className="text-[18px] md:text-[26px] font-quicksand font-normal text-white"
            >
              Nous contacter
            </Link>
          </div>
          <div className="max-w-[500px] md:max-w-[700px] px-5 text-white font-light text-[16px] md:text-[20px] font-quicksand text-center">
            Tous droits réservés- Acces-Sec{" "}
          </div>
          <div className="max-w-[500px] md:max-w-[700px] px-5 text-white font-light font-quicksand text-center">
            2025 ® Email : Info@acces-sec.ca
          </div>
        </div>
        <div className="flex justify-between">
          <div className="rounded-tr-[50px] w-[45%] h-[52px] bg-[#FE8840]"></div>
          <div className="rounded-tl-[50px] w-[45%] h-[52px] bg-[#FE8840]"></div>
        </div>
      </div>
    </>
  );
};
