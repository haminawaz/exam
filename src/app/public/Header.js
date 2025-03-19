"use client";
import React, { useState } from "react";
import usa from "../../../public/images/usa.svg"; // Imported image
import france from "../../../public/images/france.svg"; // Imported image
import Image from "next/image";
import { Select } from "antd";
import { UserAuthContext } from "../contexts/auth-context";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const { lng, setLng } = UserAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    setLng(language);
    setIsOpen(false);
  };

  const LANGUAGES = [
    {
      code: "english",
      name: "English",
      flag: usa.src, // Use the .src property of the imported image
    },
    {
      code: "french",
      name: "French",
      flag: france.src, // Use the .src property of the imported image
    },
  ];

  const currentLanguage = LANGUAGES.find((val) => lng === val.code) || LANGUAGES[0]; // Fallback to the first language

  return (
    <div className="hidden md:flex flex-col sm:flex-row justify-between align-center items-center px-5">
      <Link href="/home"> <img width={110} height={110} src="/images/logo.svg" alt="Acces" /></Link>
      
      <div className="flex flex-row h-[60px] md:h-[50px] gap-3 pr-[50px] mb-5 md:mb-0 items-center">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center mt-1"
          >
            <div className="flex items-center space-x-2">
              <img
                src={currentLanguage.flag} // Use the .src property
                alt={`${currentLanguage.name} flag`}
                className="w-7 h-7 rounded-full object-cover"
              />
              <ChevronDown
                className={`text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                  }`}
                size={20}
              />
            </div>
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {LANGUAGES.filter((lang) => lang.code !== lng).map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full p-2 hover:bg-gray-100 transition-colors flex justify-center"
                >
                  <img
                    src={language.flag} // Use the .src property
                    alt={`${language.name} flag`}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="primary-btn bg-[#FE8840] text-white px-[60px] py-3 rounded-[25px] cursor-pointer transition">
          Login
        </button>

        <img src="/images/shopping_basket.png" alt="Acces" />
      </div>
    </div>
  );
};