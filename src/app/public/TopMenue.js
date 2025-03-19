"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import usa from "../../../public/images/usa.svg";
import france from "../../../public/images/france.svg";
import Image from "next/image";
import { Select } from "antd";

export const TopMenue = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    console.log("Selected Language:", value);
  };
  const options = [
    {
      key: "en-opt",
      value: "en",
      label: (
        <div className=" tex-[16px] font-semibold flex gap-2 ">
          <div className="flex items-center rounded-full">
            <Image
              src={usa}
              alt="english"
              width={26}
              height={26}
              className="object-cover !w-[22px] !h-[22px]"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <span className="font-medium">English (US)</span>
        </div>
      ),
    },
    {
      key: "fr-opt",
      value: "fr",
      label: (
        <div className="tex-[16px] font-semibold flex gap-2 ">
          <Image src={france} alt="french" width={20} height={20} />
          <span className="font-medium">French</span>
        </div>
      ),
    },
  ];
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
            //
            className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
          >
            Home
          </button>
        </Link>
        <Link href="/quiz" className="inline-block">
          <button
            onClick={() => setActiveSection("quiz")}
            //
            className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
          >
            Free Simulator
          </button>
        </Link>
        <Link href="/choose-avatar" className="inline-block">
          <button
            onClick={() => setActiveSection("choose-avatar")}
            // onClick={() => setActiveSection("access-simulator")}
            className="text-[18px] md:text-[26px]  font-normal text-white cursor-pointer font-quicksand"
          >
            Access Simulator
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
        {/* <button
          onClick={() => setActiveSection("quiz")}
          className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand"
        >
          About Us
        </button>
        <button className="text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand">
          Contact Us
        </button> */}

        {/* <button className="md:hidden text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand">
          Free Trail
        </button> */}

        <button className="md:hidden text-[18px] md:text-[26px] font-normal text-white cursor-pointer font-quicksand">
          Login
        </button>
        <div className="md:hidden ">
          <Select
            defaultValue={selectedLanguage}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="language-select w-44 custom_select bg-black text-white"
            popupClassName=""
            options={options}
          />
        </div>
      </div>
    </div>
  );
};
