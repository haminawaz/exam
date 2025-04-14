"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "antd/es/alert/Alert";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function page() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({});
    try {
      const response = await fetch(`${serverBaseUrl}/user/question/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const responseData = await response.json();
      if (response.ok) {
        const token = responseData?.response?.data;
        localStorage.setItem("token", token);
        router.push("/access-quiz");
        return;
      }
      if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "Une erreur s'est produite");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else if (response.status === 404) {
        setAlertMessage(responseData.message);
        setTimeout(() => {
          setAlertMessage(false);
          router.push("/payment");
        }, 3000);
      } else {
        setAlertMessage(responseData.message);
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setTimeout(false);
    }
  };

  return (
    <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
        {alertMessage && (
          <div className="col-12 mb-4">
            <Alert
              closable
              message={alertMessage}
              type="error"
              onClose={() => setAlertMessage(false)}
            />
          </div>
        )}

        <h1 className="text-[16px] font-quicksand font-bold text-[#000000] text-center md:text-left mb-8">
          Login as a child into access sec
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
              placeholder="Please Enter Your Parent Email"
              required
            />
            {errors?.email && (
              <p className="joi-error-message">{errors?.email[0]}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
              placeholder="please enter your code"
              maxLength={6}
              required
            />
            {errors?.code && (
              <p className="joi-error-message">{errors?.code[0]}</p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={disabled}
              className="primary-btn mt-5 font-quicksand bg-[#FE8840] text-white px-[60px] py-3 rounded-[25px] cursor-pointer transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
