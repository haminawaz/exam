"use client";
import React, { useState } from "react";

export const Getintouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <section className="py-[50px]">
        <div
          className="border border-[#FE8840] m-[20px] sm:m-[70px] md:m-[100px] p-5 md:p-[50px]"
          style={{ borderWidth: "3px" }}
        >
          <div className="flex flex-row justify-center items-center">
            <img
              className="hidden md:block mr-[70px] w-[86px] h-[92px]"
              src="/images/topstar.png"
              alt="Acces"
            />
            <div>
              <p className="text-[16px] md:text-[20px] font-quicksand font-bold text-[#FE8840] text-center">
                GET IN TOUCH
              </p>
              <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-center ml-[-10px]">
                Needs Help? Let’s Get in Touch
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-[50px]">
            <form
              onSubmit={handleSubmit}
              className="sm:space-y-4 md:w-[70%] md:ml-[60px]"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="sm:w-1/2 p-3 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  "
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="sm:w-1/2 p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-md   "
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-md   "
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                className="w-full p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-md   "
                required
              ></textarea>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="primary-btn font-roboto bg-[#FE8840] text-white p-3 rounded-[25px] cursor-pointer transition"
                >
                  Get In Touch With Us
                </button>
              </div>
              <div className="flex justify-end">
                <img
                  className="hidden md:block w-[58px] h-[62px] mt-[-40px]"
                  src="/images/bottomstar.png"
                  alt="Acces"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* <section className="py-[50px]">
        <div className="relative flex justify-center items-center min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
          <img
            src="/images/rectangle_fram.png"
            alt="Frame"
            className="absolute w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]   h-auto aspect-[4/3] object-contain"
          />
          <div className="relative max-h-full overflow-hidden h-[50%] w-full max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[50%] p-[30px] sm:p-[40px] md:p-[50px] text-center">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <img
                className="hidden md:block mr-[30px] md:mr-[50px] w-[60px] md:w-[86px] h-[65px] md:h-[92px]"
                src="/images/topstar.png"
                alt="Acces"
              />
              <div>
                <p className="text-[14px] sm:text-[16px] md:text-[20px] font-quicksand font-bold text-[#FE8840] text-center">
                  GET IN TOUCH
                </p>
                <h1 className="text-[22px] sm:text-[28px] md:text-[35px] lg:text-[40px] font-poppins font-bold text-center">
                  Needs Help? Let’s Get in Touch
                </h1>
              </div>
            </div>

            <div className="flex justify-center items-center mt-[30px] sm:mt-[40px] md:mt-[50px]">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full sm:w-1/2 p-3 rounded-md shadow-md"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full sm:w-1/2 p-3 rounded-md shadow-md"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-3 rounded-md shadow-md mt-4"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="4"
                  className="w-full p-3 rounded-md shadow-md mt-4"
                  required
                ></textarea>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-[#FE8840] text-white px-6 py-3 rounded-full transition hover:bg-[#e57430]"
                  >
                    Get In Touch With Us
                  </button>
                </div>

                <div className="flex justify-end">
                  <img
                    className="hidden md:block w-[40px] md:w-[58px] h-[42px] md:h-[62px] mt-[-20px]"
                    src="/images/bottomstar.png"
                    alt="Acces"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};
