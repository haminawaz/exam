"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const TopMenue = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <div className="md:hidden flex justify-between items-center p-4">
        <img src="/images/logo.png" alt="Acces" />
        <button onClick={() => setIsOpen(!isOpen)} className="">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        className={`${isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-5 md:gap-[50px] justify-center items-center md:items-center bg-black`}
      >

        <Link href="/" className="inline-block">
          <button
            onClick={() => setActiveSection("home")}
            className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
          >
            Home
          </button>
        </Link>
        <Link href="/quiz" className="inline-block">
          <button
            onClick={() => setActiveSection("quiz")}
            className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
          >
            Free Simulator
          </button>
        </Link>
        <Link href="/payment" className="inline-block">
          <button
            onClick={() => setActiveSection("products")}
            className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
          >
            Products
          </button>
        </Link>
        <Link href="/access-simulator" className="inline-block">
          <button
            onClick={() => setActiveSection("access-simulator")}
            className="text-[18px] md:text-[26px]  font-normal text-white cursor-pointer font-quicksand"
          >
            Access Simulator
          </button>
        </Link>

        <button className="md:hidden text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand">
          Login
        </button>
      </div>
    </div>
  );
};
