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
  const [disabled, setDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelFromUrl = urlParams.get("selected-level");
    if (levelFromUrl && levelFromUrl === "4") {
      setSelectedLevel(4);
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
        } else if (responseData.message === "Jeton invalide ou expiré") {
          localStorage.removeItem("token");
          setToken(null);
          fetchLevels();
        } else if (response.status === 404) {
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
      setSelectedLevel(2);
    }
  };

  const backToCourses = () => {
    setSelectedLevel(1);
    setErrors({});
    setAlertMessage(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      postalCode: "",
    });
  };

  const createCheckout = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({});
    try {
      const response = await fetch(
        `${serverBaseUrl}/user/order/checkout/${selectedCourse}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      if (response.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          postalCode: "",
        });
        const stripe = await loadStripe(stripePublicKey);
        const sessionId = responseData?.response?.data?.sessionId;
        await stripe.redirectToCheckout({
          sessionId,
        });
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "Une erreur s'est produite");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(responseData.message);
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error(error.message || "Une erreur s'est produite");
    } finally {
      setDisabled(false);
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
                  Niveau {course.level} ({course.difficulty})
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
                      Paiement ${course.price} CA
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

      {selectedLevel === 2 && (
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
              Créer un compte en tant que parent pour un besoin d'identification
              lors de l'utilisation du simulateur
            </h1>

            <form onSubmit={createCheckout} className="space-y-3">
              <div className="mb-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
                  required
                  placeholder="Entrez votre prénom"
                />
                {errors?.firstName && (
                  <p className="joi-error-message">{errors?.firstName[0]}</p>
                )}
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
                  required
                  placeholder="Entrez votre nom de famille"
                />
                {errors?.lastName && (
                  <p className="joi-error-message">{errors?.lastName[0]}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
                  required
                  placeholder="Veuillez entrer le courriel du parent"
                />
                {errors?.email && (
                  <p className="joi-error-message">{errors?.email[0]}</p>
                )}
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full h-12 px-6 py-2 my-2 border-2 border-[#FE8840] rounded-[25px] focus:outline-none"
                  required
                  placeholder="Entrez votre code postal à 6 caractères"
                />
                {errors?.postalCode && (
                  <p className="joi-error-message">{errors?.postalCode[0]}</p>
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
                  disabled={disabled}
                  className="bg-[#FE8840] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e67730] transition-all flex items-center cursor-pointer"
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {selectedLevel === 3 && (
        <section className="px-[50px] md:px-[100px] lg:px-[200px] bg-[#f9f9f9] py-5 flex justify-center mt-5">
          <div className="flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
            <Spinner />
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
            <h1 className="text-[22px] font-bold text-[#000000]">Succès !</h1>
            <p className="text-[18px] font-medium text-[#B6B6B6] text-center">
              Félicitations ! Votre paiement a été traité avec succès.
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
                Veuillez vérifier votre courriel
              </h1>
              <p className="text-[18px] font-medium text-[#B6B6B6] text-center">
                Un code d'accès vous a été envoyé avec succès.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
