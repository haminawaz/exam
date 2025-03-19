"use client";
import Link from "next/link";
import React, { useState } from "react";

const levels1 = [
  {
    id: 1,
    image: "/images/payment/level_11.png",
    title: "Level 1",
    subject: "MATHS",
    price: "$19",
  },
  {
    id: 2,
    image: "/images/payment/level_11.png",
    title: "Level 1",
    subject: "FRENCH",
    price: "$25",
  },
  
];

const levels2 = [
  {
    id: 1,
    image: "/images/payment/level_11.png",
    title: "Level 2",
    subject: "MATHS",
    price: "$19",
  },
  
  {
    id: 2,
    image: "/images/payment/level_11.png",
    title: "Level 2",
    subject: "FRENCH",
    price: "$30",
  },
  
];
export default function Welcome({setActiveSection}) {
  const [selectedLevel, setSelectedLevel] = useState(1);
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
      {/*  all details show */}
      {selectedLevel === 1 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] pb-5">
          <h1 className="text-[40px] font-bold py-5">Level 1</h1>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {levels1.map((level) => (
                <div key={level.id} className="bg-[#cde3ee] m-3 rounded-2xl">
                  <div className="bg-[#ffffff] rounded-xl pb-[35px]">
                    <img
                      className="rounded-2xl"
                      src={level.image}
                      alt={level.title}
                    />
                  </div>
                  <div className="bg-[#fff3e9] mx-5 rounded-2xl mt-[-30px] p-5">
                    <h1 className="text-[22px] font-bold text-black text-center">
                      {level.title}
                    </h1>
                    <p className="text-[20px] font-normal text-black text-center my-1">
                      {level.subject}
                    </p>
                    <p className="text-[16px] font-bold text-black text-center ">
                      {level.price}
                    </p>
                  </div>
                  <div className="flex justify-center my-5">
                    <button
                      type="submit"
                      className="primary-btn bg-[#FE8840] text-white p-3 rounded-[25px] cursor-pointer transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#FE8840] rounded-2xl  w-[350px] h-[300px] py-5 ml-5 mb-1">
              <h1 className="text-[20px] font-bold pl-3">Your Basket</h1>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] pl-3">
                Maths
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="my-2 w-[90%] border border-[#A5A5A5] text-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  COLLECTION
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="my-2 w-[40%] border border-[#6E7173] text-[#000000] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  Today
                </button>
                <select className="my-2 w-[40%] bg-[#636668] text-white border border-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition">
                  <option value="16:40">16:40</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
              <div className="flex flex-row justify-between px-3">
                <p className="text-[22px] font-normal">TOTAL</p>
                <p className="text-[22px] font-normal">$ 0.00</p>
              </div>
              <p
                onClick={() => setSelectedLevel(2)}
                className="text-[14px] font-bold text-white bg-[#FE8840] text-center pl-3"
              >
                Checkout
              </p>
              <p className="text-[14px] font-normal pr-3 underline hover:no-underline text-right pt-2">
                Enter a coupon code
              </p>
            </div>
          </div>

          <h1 className="text-[40px] font-bold py-5">Level 2</h1>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {levels2.map((level) => (
                <div key={level.id} className="bg-[#cde3ee] m-3 rounded-2xl">
                  <div className="bg-[#ffffff] rounded-xl pb-[35px]">
                    <img
                      className="rounded-2xl"
                      src={level.image}
                      alt={level.title}
                    />
                  </div>
                  <div className="bg-[#fff3e9] mx-5 rounded-2xl mt-[-30px] p-5">
                    <h1 className="text-[22px] font-bold text-black text-center">
                      {level.title}
                    </h1>
                    <p className="text-[20px] font-normal text-black text-center my-1">
                      {level.subject}
                    </p>
                    <p className="text-[16px] font-bold text-black text-center ">
                      {level.price}
                    </p>
                  </div>
                  <div className="flex justify-center my-5">
                    <button
                      type="submit"
                      className="primary-btn bg-[#FE8840] text-white p-3 rounded-[25px] cursor-pointer transition"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#FE8840] rounded-2xl  w-[350px] h-[300px] py-5 ml-5 mb-1">
              <h1 className="text-[20px] font-bold pl-3">Your Basket</h1>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] pl-3">
                Maths
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="my-2 w-[90%] border border-[#A5A5A5] text-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  COLLECTION
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="my-2 w-[40%] border border-[#6E7173] text-[#000000] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  Today
                </button>
                <select className="my-2 w-[40%] bg-[#636668] text-white border border-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition">
                  <option value="16:40">16:40</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
              <div className="flex flex-row justify-between px-3">
                <p className="text-[22px] font-normal">TOTAL</p>
                <p className="text-[22px] font-normal">$ 0.00</p>
              </div>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] text-center pl-3">
                Cart Updated.
              </p>
              <p className="text-[14px] font-normal pr-3 underline hover:no-underline text-right pt-2">
                Enter a coupon code
              </p>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center rounded-2xl my-5">
            <h1 className="text-[40px] font-bold">Your Cart</h1>
            <div className="border border-[#FE8840] rounded-2xl  w-[350px] h-[300px] py-5 ml-5 mb-1">
              <h1 className="text-[20px] font-bold pl-3">Your Basket</h1>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] pl-3">
                Maths
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="my-2 w-[90%] border border-[#A5A5A5] text-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  COLLECTION
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="my-2 w-[40%] border border-[#6E7173] text-[#000000] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  Today
                </button>
                <select className="my-2 w-[40%] bg-[#636668] text-white border border-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition">
                  <option value="16:40">16:40</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
              <div className="flex flex-row justify-between px-3">
                <p className="text-[22px] font-normal">TOTAL</p>
                <p className="text-[22px] font-normal">$ 0.00</p>
              </div>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] text-center pl-3">
                Cart Updated.
              </p>
              <p className="text-[14px] font-normal pr-3 underline hover:no-underline text-right pt-2">
                Enter a coupon code
              </p>
            </div>
          </div>
        </section>
      )}
      {selectedLevel === 2 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] pb-5 flex justify-center mt-5">
          <div className="flex flex-col lg:flex-row justify-center items-center p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[100%] xl:w-[80%] 2xl:w-[60%]">
            <div>
              <button className="primary-btn bg-[#FE8840] text-white px-[15px] py-1 rounded-[10px] transition cursor-pointer mb-2">
                Order As Guest
              </button>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <span className="absolute left-3 top-[50%] translate-y-[-50%] text-[#FE8840]">
                    First Name:
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-[110px] border border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <span className="absolute left-3 top-[50%] translate-y-[-50%] text-[#FE8840]">
                    Last Name:
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-[110px] border border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <span className="absolute left-3 top-[50%] translate-y-[-50%] text-[#FE8840]">
                    Email:
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-[110px] border border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <span className="absolute left-3 top-[50%] translate-y-[-50%] text-[#FE8840]">
                    Postal Address:
                  </span>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-[110px] border border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedLevel(1)}
                    className=" text-black underline px-4 py-2"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setSelectedLevel(3)}
                    // type="submit"
                    className="primary-btn bg-[#FE8840] text-white px-[10px] py-1 rounded-[25px] transition cursor-pointer"
                  >
                    Continue As Guest
                  </button>
                </div>
              </form>
            </div>

            <div className="border border-[#FE8840] rounded-2xl w-[250px] md:w-[350px] h-[300px] mt-2 lg:mt-0 md:py-5 ml-5 mb-1">
              <h1 className="text-[20px] font-bold pl-3">Your Basket</h1>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] pl-3">
                Maths
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="my-2 w-[90%] border border-[#A5A5A5] text-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  COLLECTION
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="my-2 w-[40%] border border-[#6E7173] text-[#000000] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  Today
                </button>
                <select className="my-2 w-[40%] bg-[#636668] text-white border border-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition">
                  <option value="16:40">16:40</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
              <div className="flex flex-row justify-between px-3">
                <p className="text-[22px] font-normal">TOTAL</p>
                <p className="text-[22px] font-normal">$ 0.00</p>
              </div>
              <p
                onClick={() => setSelectedLevel(2)}
                className="text-[14px] font-bold text-white bg-[#FE8840] text-center pl-3"
              >
                Cart Updated.
              </p>
              <p className="text-[14px] font-normal pr-3 underline hover:no-underline text-right pt-2">
                Enter a coupon code
              </p>
            </div>
          </div>
        </section>
      )}

      {selectedLevel === 3 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] pb-5 flex justify-center mt-5">
          <div className="flex flex-col lg:flex-row justify-center items-center p-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[100%] xl:w-[80%] 2xl:w-[60%]">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="option1" className="text-[14px] font-bold">
                    Online by credit card
                  </label>
                </div>
                <p className="text-[14px] font-normal text-[#1F1C14] my-2">
                  You will be able to review your order once last time after you
                  click on “Next”
                </p>
                <p className="text-[14px] font-bold text-[#1F1C14] my-2">
                  Card Details :
                </p>

                <div className="mb-4">
                  <label
                    htmlFor="cardnumber"
                    className="block text-[12px] font-bold text-[#1F1C14] mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardnumber"
                    name="cardnumber"
                    placeholder="1234 1234 1234 1234"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="mb-4">
                    <label
                      htmlFor="expirationdate"
                      className="block text-[12px] font-bold text-[#1F1C14] mb-1"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expirationdate"
                      name="expirationdate"
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="securitycode"
                      className="block text-[12px] font-bold text-[#1F1C14] mb-1"
                    >
                      Security Code
                    </label>
                    <input
                      type="text"
                      id="securitycode"
                      name="securitycode"
                      placeholder="CVC"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-[12px] font-bold text-[#1F1C14] mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter your country name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="postalcode"
                    className="block text-[12px] font-bold text-[#1F1C14] mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    placeholder="MST 12344"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    className="w-3 h-3 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="option1" className="text-[14px] font-bold">
                    Cash
                  </label>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedLevel(2)}
                    className=" text-black underline px-4 py-2"
                  >
                    Back
                  </button>
                  <Link href="/order-summary">
                    <button
                      // onClick={() => setSelectedLevel(4)}
                      // onClick={() => setActiveSection("order-summary")}
                      className=" text-[#FE8840] transition cursor-pointer"
                    >
                      Next
                    </button>
                  </Link>
                </div>
              </form>
            </div>

            <div className="border border-[#FE8840] rounded-2xl  w-[250px] md:w-[350px] h-[300px] mt-2 lg:mt-0 md:py-5 ml-5 mb-1">
              <h1 className="text-[20px] font-bold pl-3">Your Basket</h1>
              <p className="text-[14px] font-bold text-white bg-[#FE8840] pl-3">
                Maths
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="my-2 w-[90%] border border-[#A5A5A5] text-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  COLLECTION
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="my-2 w-[40%] border border-[#6E7173] text-[#000000] py-1 rounded-[25px] cursor-pointer transition text-center"
                >
                  Today
                </button>
                <select className="my-2 w-[40%] bg-[#636668] text-white border border-[#A5A5A5] py-1 rounded-[25px] cursor-pointer transition">
                  <option value="16:40">16:40</option>
                  <option value="17:00">17:00</option>
                  <option value="17:30">17:30</option>
                </select>
              </div>
              <div className="flex flex-row justify-between px-3">
                <p className="text-[22px] font-normal">TOTAL</p>
                <p className="text-[22px] font-normal">$ 0.00</p>
              </div>
              <p
                onClick={() => setSelectedLevel(2)}
                className="text-[14px] font-bold text-white bg-[#FE8840] text-center pl-3"
              >
                Cart Updated.
              </p>
              <p className="text-[14px] font-normal pr-3 underline hover:no-underline text-right pt-2">
                Enter a coupon code
              </p>
            </div>
          </div>
        </section>
      )}

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
