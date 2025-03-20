"use client";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="hidden md:flex flex-col sm:flex-row justify-between align-center items-center px-5">
      <Link href="/home">
        {" "}
        <img width={110} height={110} src="/images/logo.svg" alt="Acces" />
      </Link>

      <div className="flex flex-row h-[60px] md:h-[50px] gap-3 pr-[50px] mb-5 md:mb-0 items-center">
        <button className="primary-btn bg-[#FE8840] text-white px-[60px] py-3 rounded-[25px] cursor-pointer transition">
          Connexion
        </button>

        <img src="/images/shopping_basket.png" alt="Acces" />
      </div>
    </div>
  );
};
