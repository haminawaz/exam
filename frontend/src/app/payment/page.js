"use client";
import React, { useState } from "react";

const levels = [
  {
    price: "$19",
    title: "Level 1",
    courses: [
      {
        id: 1,
        image: "/images/payment/level_11.png",
        subject: "MATHS",
      },
      {
        id: 2,
        image: "/images/payment/level_11.png",
        subject: "FRENCH",
      },
    ],
  },
  {
    price: "$29",
    title: "Level 2",
    courses: [
      {
        id: 1,
        image: "/images/payment/level_11.png",
        subject: "MATHS",
      },
      {
        id: 2,
        image: "/images/payment/level_11.png",
        subject: "FRENCH",
      },
    ],
  },
];

export default function Welcome({ setActiveSection }) {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    code: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
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
      {selectedLevel === 1 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {levels?.map((course, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-[32px] font-bold mb-6 text-center">
                  {course.title}
                </h2>
                <div className="space-y-4">
                  {course?.courses?.map((course, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-[#fff3e9] rounded-lg"
                    >
                      <div>
                        <h3 className="text-[20px] font-bold">
                          {course.subject}
                        </h3>
                      </div>
                      <img
                        src={course.image}
                        alt={course.subject}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[18px] text-gray-600"></p>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedLevel(2)}
                    className="w-full bg-[#FE8840] text-white py-3 rounded-[25px] text-lg font-bold hover:bg-[#e67730] transition cursor-pointer"
                  >
                    Checkout {course.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedLevel === 2 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-bold text-[#FE8840]">
                Create account
              </h2>
              <p className="text-gray-600 mt-2">
                Please fill in your details to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your first name"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your last name"
                />
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your postal address"
                />
              </div>

              <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedLevel(1)}
                  className="flex items-center text-[#FE8840] hover:text-[#e67730] transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setSelectedLevel(3)}
                  className="bg-[#FE8840] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67730] transition-all flex items-center cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
            <p className="flex justify-center pt-1">
              Already an account?{" "}
              <button
                onClick={() => setSelectedLevel(3)}
                className="flex items-center text-[#FE8840] hover:text-[#e67730] cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </section>
      )}

      {selectedLevel === 3 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-bold text-[#FE8840]">
                Login account
              </h2>
              <p className="text-gray-600 mt-2">
                Please fill in your details to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginChange}
                    className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="code"
                    value={loginFormData.code}
                    onChange={handleLoginChange}
                    className="w-full p-4 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                    required
                    placeholder="Enter your code"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedLevel(4)}
                  className="bg-[#FE8840] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67730] transition-all flex items-center cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
            <p className="flex justify-center pt-1">
              Create an account?{" "}
              <button
                onClick={() => setSelectedLevel(2)}
                className="flex items-center text-[#FE8840] hover:text-[#e67730] cursor-pointer"
              >
                Signup
              </button>
            </p>
          </div>
        </section>
      )}

      {selectedLevel === 4 && (
        <section className="flex justify-center bg-[#f9f9f9] py-5">
          <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
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
