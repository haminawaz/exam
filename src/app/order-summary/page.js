"use client";
import React, { useState } from "react";

export default function page() {
  const [selectedLevel, setSelectedLevel] = useState(4);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}`
    );
    setSelectedLevel(3);
  };
  return (
    <>
      {selectedLevel === 4 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#ffffff] flex justify-center my-5">
          <div className="flex flex-col justify-center items-center p-2 sm:p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[100%] xl:w-[50%] 2xl:w-[50%]">
            <div className="bg-[#FFF3E9] sm:p-5 rounded-xl md:w-[300px]">
              <div className="flex flex-row gap-[40px] items-center">
                <h1 className="text-[16px] font-bold text-[#000000]">Emile</h1>
                <div className="flex flex-row bg-black border rounded-[25px] text-white p-1 items-center">
                  <img
                    cal
                    src="/images/payment/home.png"
                    alt="Farrukh"
                    className="w-[14px] h-[11px]"
                  />
                  <span className="text-[7px] font-medium text-white">
                    Home
                  </span>
                </div>
              </div>
              <div className="md:w-[200px]">
                <p className="text-[10px] font-medium text-[#6E6E6E]">
                  Laxmi Hospital, doddapete,kadur near chikkamagalur - 577548
                </p>
                <span className="text-[10px] font-medium">+91 9754324564</span>
              </div>
              <div className="flex justify-end">
                <span className="text-end text-[12px] font-bold">CHANGE</span>
              </div>
            </div>

            <div className="self-start">
              <h1 className="text-[24px] font-normal text-[#1F1C14] my-5">
                Order Summary
              </h1>
              <div className="border border-[#D9D9D9] p-5 rounded-lg w-[100%]">
                <div className="flex flex-col sm:flex-row gap-[50px] justify-center items-center">
                  <div>
                    <img
                      className="!w-[170px] !h-[85px]"
                      src="/images/payment/level_11.png"
                      alt="icon"
                    />
                  </div>
                  <div className="">
                    <div>
                      <h1 className="text-[18px] font-medium text-[#525252]">
                        level -2
                      </h1>
                      <p className="text-[12px] font-normal text-[#888888]">
                        Mathematics _ Trignometry course
                      </p>
                    </div>
                    <div className="text-[16px] font-semibold text-[#525252] mt-5">
                      $ 21.45
                    </div>
                  </div>
                  <div className=" shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
                    <img
                      className=""
                      src="/images/payment/plus.png"
                      alt="icon"
                    />
                    <p className="text-[12px] font-bold text-[#1F1C14] bg-[#fe8840] text-center w-[33px] h-[33px] items-center flex justify-center">
                      1
                    </p>
                    <img
                      className=""
                      src="/images/payment/delete.png"
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row mt-5 gap-[50px] justify-center items-center">
                  <div>
                    <img
                      className="!w-[170px] !h-[85px]"
                      src="/images/payment/level_11.png"
                      alt="icon"
                    />
                  </div>
                  <div className="">
                    <div>
                      <h1 className="text-[18px] font-medium text-[#525252]">
                        level -2
                      </h1>
                      <p className="text-[12px] font-normal text-[#888888]">
                        Mathematics _ Trignometry course
                      </p>
                    </div>
                    <div className="text-[16px] font-semibold text-[#525252] mt-5">
                      $ 40.45
                    </div>
                  </div>
                  <div className="mt-2 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
                    <img
                      className=""
                      src="/images/payment/plus.png"
                      alt="icon"
                    />
                    <p className="text-[12px] font-bold text-[#1F1C14] bg-[#fe8840] text-center w-[33px] h-[33px] items-center flex justify-center">
                      1
                    </p>
                    <img
                      className=""
                      src="/images/payment/delete.png"
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-5">
                <h1 className="text-[22px] font-bold text-[#525252]">
                  Product total
                </h1>
                <h1 className="text-[22px] font-bold text-[#525252]">
                  $124.50
                </h1>
              </div>
              <div className="border-b border-[#CCCCCC] mt-5 w-[95%] mx-auto"></div>

              <div className="flex flex-row justify-between mt-5">
                <h1 className="text-[22px] font-bold text-[#525252]">
                  Disscount
                </h1>
                <h1 className="text-[22px] font-bold text-[#525252]">
                  %6 <span className="text-[#888888]">($12.25)</span>
                </h1>
              </div>
              <div className="border-b border-[#CCCCCC] mt-5 w-[90%] mx-auto"></div>

              <div className="flex flex-row justify-between mt-5 px-5">
                <h1 className="text-[20px] font-normal text-[#000000]">
                  Total
                </h1>
                <h1 className="text-[20px] font-normal text-[#000000]">
                  $112.25
                </h1>
              </div>

              <div className="flex items-center justify-center mt-[40px]">
                <button
                  // type="submit"
                  onClick={() => setSelectedLevel(5)}
                  className="primary-btn bg-[#FE8840] text-white p-3 rounded-[25px] cursor-pointer transition w-[80%] m-auto"
                >
                  Complete Order
                </button>
              </div>

              <div className="flex items-center justify-center mt-3">
                <input
                  type="checkbox"
                  id="sendEmail"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="sendEmail"
                  className="text-[16px] font-bold text-[#000000]"
                >
                  Send an email to the customer
                </label>
              </div>
            </div>
          </div>
        </section>
      )}
      {selectedLevel === 5 && (
        <section className=" bg-[#f9f9f9] py-[50px]">
          <div className="flex flex-col justify-center items-center px-[30px] md:w-[40%] m-auto gap-5 bg-[#ffffff]">
            <img
              src="/images/payment/true_icon.png"
              alt="Farrukh"
              className="w-[48px] h-[48px]"
            />
            <h1 className="text-[22px] font-bold text-[#000000]">Success!</h1>
            <p className="text-[18px] font-medium text-[#B6B6B6] text-center">
              Congratulations! You have been successfully registered
            </p>
            <div>
              <div className="flex justify-center">
                <img
                  src="/images/payment/email_box.png"
                  alt="Farrukh"
                  className="w-[48px] h-[48px]"
                />
              </div>
              <h1 className="text-[15px] font-medium text-[#000000] text-center pt-2">
                Please Check Your Email
              </h1>
              <p className="text-[18px] font-medium text-[#B6B6B6] text-center">
                Access Code has been successfully sent
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
