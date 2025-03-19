"use client";
import React, { useState } from "react";

export default function page() {
  const [email, setemail] = useState("");
  const [code, setCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  return (
    <section className="bg-[#f9f9f9] pb-5 p-5">
      <div className="bg-white md:w-[70%] lg:w-[50%] m-auto my-5 p-5 flex flex-col justify-center items-center shadow-lg shadow-[#00000040] rounded-lg">
        <div className=" flex flex-col md:flex-row justify-center items-center">
          <div>
            <h1 className="text-[16px] font-quicksand font-bold text-[#000000] text-center md:text-left">
              Login as a child into access sec
            </h1>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder={email ? "" : "Please Enter Your Parent Email"}
              className="w-full h-12 px-4 py-2 my-2 border-2 border-[#FE8840] rounded-[10px] text-center placeholder:text-center focus:outline-none placeholder:text-[#FE8840]"
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={code ? "" : "please enter your temporary code"}
              className="w-full h-12 px-4 py- border-2 border-[#FE8840] rounded-[10px] text-center placeholder:text-center focus:outline-none placeholder:text-[#FE8840]"
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="w-5 h-5 accent-[#FE8840] cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-gray-700 font-quicksand cursor-pointer"
              >
                Remember Me
              </label>
            </div>
          </div>
          <div>
            <img
              src="/images/choose-avatar/girl_11.png"
              alt="Farrukh"
              className=" pl-5 "
            />
          </div>
        </div>
        <button className="primary-btn mt-5 font-quicksand bg-[#FE8840] text-white px-[60px] py-3 rounded-[25px] cursor-pointer transition">
          Login
        </button>
      </div>
    </section>
  );
}
