"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Alert from "antd/es/alert/Alert";
import { Spinner } from "../components/ui/spinner";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

export default function Welcome({ setActiveSection }) {
  const [levels, setLevels] = useState([]);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    code: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${serverBaseUrl}/user/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage(
          "User created successfully! Please check your email for the code"
        );
        setTimeout(() => {
          setSuccessMessage(false);
          setSelectedLevel(2);
        }, 5000);
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(responseData.message);
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await fetch(`${serverBaseUrl}/user/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });
      const responseData = await response.json();
      if (response.ok) {
        const token = responseData?.response?.data;
        localStorage.setItem("token", token);
        setToken(token);
        setSelectedLevel(4);
        createCheckout();
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(responseData.message);
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelFromUrl = urlParams.get("selected-level");
    if (levelFromUrl && levelFromUrl === "5") {
      setSelectedLevel(5);
    }

    const fetchLevels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${serverBaseUrl}/user/level`, {
          method: "GET",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          const levels = responseData?.response?.data || [];
          setLevels(levels);
        } else if (responseData.message === "Invalid token or expired") {
          localStorage.removeItem("token");
          setToken(null)
          fetchLevels()
        }else if (response.status === 404) {
          setLevels([]);
        } else {
          console.error("Failed to fetch levels");
        }
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };
    fetchLevels();

    const token = localStorage.getItem("token");
    setToken(token);
  }, [selectedLevel]);

  const selectCourse = (courseId) => {
    setSelectedCourse(courseId);
    if (courseId) {
      if (!token) {
        setSelectedLevel(2);
      } else {
        createCheckout(courseId);
      }
    }
  };

  const goToLogin = () => {
    setSelectedLevel(2);
    setErrors({});
    setAlertMessage(false);
  };

  const goToSignup = () => {
    setSelectedLevel(3);
    setErrors({});
    setAlertMessage(false);
  };

  const backToCourses = () => {
    setSelectedLevel(1);
    setErrors({});
    setAlertMessage(false);
  };

  const createCheckout = async (courseId = null) => {
    setSelectedLevel(4);
    const stripe = await loadStripe(stripePublicKey);
    try {
      if (!courseId) {
        courseId = selectedCourse;
      }
      const response = await fetch(
        `${serverBaseUrl}/user/order/checkout/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.status === 201) {
        const sessionId = responseData?.response?.data?.sessionId;
        await stripe.redirectToCheckout({
          sessionId,
        });
      } else if (response.status === 400 || response.status === 409) {
        setSelectedLevel(1);
        setAlertMessage(responseData.message || "An error occurred");
        setTimeout(() => setAlertMessage(false), 3000);
      } else if (responseData.message === "Invalid token or expired") {
        localStorage.removeItem("token");
        setToken(null);
        setSelectedLevel(2);
        setErrors({});
      } else {
        console.error(responseData.message || "An error occurred");
        setSelectedLevel(1);
      }
    } catch (error) {
      console.error(error.message || "An error occurred");
      setSelectedLevel(1);
    }
  };

  return (
    <>
      {selectedLevel === 1 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {levels?.map((course, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-[32px] font-bold mb-6 text-center">
                  Level {course.level} ({course.difficulty})
                </h2>

                <div className="flex justify-between items-center p-4 bg-[#fff3e9] rounded-lg">
                  <div className="space-y-4 w-2/3">
                    {course?.courses?.map((subject, subIndex) => (
                      <h3 key={subIndex} className="text-[20px] font-bold">
                        {subject.subject}
                      </h3>
                    ))}
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <img
                      src={course.image}
                      alt={`Level ${course.level}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                </div>

                {!course.buy ? (
                  <div className="mt-6">
                    <button
                      onClick={() => selectCourse(course?._id)}
                      className="w-full bg-[#FE8840] text-white py-3 rounded-[25px] text-lg font-bold hover:bg-[#e67730] transition cursor-pointer"
                    >
                      Checkout ${course.price}
                    </button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="w-full text-center text-[#FE8840] py-3 rounded-[25px] text-lg font-bold cursor-default">
                      Purchased
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {!token && selectedLevel === 2 && (
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

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Please Enter Your Parent Email"
                />
                {errors?.email && (
                  <p className="joi-error-message">{errors?.email[0]}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="code"
                  value={loginFormData.code}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="please enter your code"
                />
                {errors?.code && (
                  <p className="joi-error-message">{errors?.code[0]}</p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={backToCourses}
                  className="flex items-center text-[#FE8840] hover:text-[#e67730] transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#FE8840] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67730] transition-all flex items-center cursor-pointer"
                >
                  Connexion
                </button>
              </div>
            </form>
            <p className="flex justify-center pt-1">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={goToSignup}
                className="flex items-center text-[#FE8840] hover:text-[#e67730] cursor-pointer"
              >
                Signup
              </button>
            </p>
          </div>
        </section>
      )}

      {!token && selectedLevel === 3 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            {successMessage && (
              <div className="col-12 mb-4">
                <Alert
                  closable
                  message={successMessage}
                  type="success"
                  onClose={() => setSuccessMessage(false)}
                />
              </div>
            )}
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
              Create an account as a child into access sec
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your name"
                />
                {errors?.name && (
                  <p className="joi-error-message">{errors?.name[0]}</p>
                )}
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Please Enter Your Parent Email"
                />
                {errors?.email && (
                  <p className="joi-error-message">{errors?.email[0]}</p>
                )}
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-opacity-40 border-2 placeholder-[#FE8840] border-[#FE8840] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE8840] transition-all"
                  required
                  placeholder="Enter your address"
                />
                {errors?.address && (
                  <p className="joi-error-message">{errors?.address[0]}</p>
                )}
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#FE8840] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67730] transition-all flex items-center cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
            <p className="flex justify-center pt-1">
              Already an account?{" "}
              <button
                type="button"
                onClick={goToLogin}
                className="flex items-center text-[#FE8840] hover:text-[#e67730] cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </section>
      )}

      {selectedLevel === 4 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
          <div className="flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            <Spinner />
          </div>
        </section>
      )}

      {selectedLevel === 5 && (
        <section className="flex justify-center bg-[#f9f9f9] py-5">
          <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            <img
              src="/images/payment/true_icon.png"
              alt="Farrukh"
              className="w-[48px] h-[48px]"
            />
            <h1 className="text-[22px] font-bold text-[#000000]">Success!</h1>
            <p className="text-[18px] font-medium text-[#B6B6B6] text-center">
              Congratulations! Your payment has been successfully processed.
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
                An Access Code has been successfully sent to your email.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
