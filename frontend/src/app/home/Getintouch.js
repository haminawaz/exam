"use client";
import React, { useState } from "react";
import Alert from "antd/es/alert/Alert";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export const Getintouch = () => {
  const [alertMessage, setAlertMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const body = JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    try {
      const response = await fetch(`${serverBaseUrl}/user/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const responseData = await response.json();
      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSuccessMessage("Message envoyé avec succès !");
        setTimeout(() => setSuccessMessage(false), 3000);
      } else {
        setAlertMessage(responseData.message);
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setAlertMessage("Error sending message");
      setTimeout(() => setAlertMessage(false), 3000);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <section className="py-[50px]" id="contact-us">
        <div
          className="border border-[#FE8840] m-[20px] sm:m-[70px] md:m-[100px] p-5 md:p-[50px]"
          style={{ borderWidth: "3px" }}
        >
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
          <div className="flex flex-row justify-center items-center">
            <img
              className="hidden md:block mr-[70px] w-[86px] h-[92px]"
              src="/images/topstar.png"
              alt="Acces"
            />
            <div>
              <p className="text-[16px] md:text-[20px] font-quicksand font-bold text-[#FE8840] text-center">
                Contactez-nous
              </p>
              <h1 className="text-[25px] md:text-[40px] font-poppins  font-bold text-center ml-[-10px]">
                Besoin d'aide ? Contactez-nous !
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
                  placeholder="Nom"
                  className="sm:w-1/2 p-3 rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  "
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Courriel"
                  className="sm:w-1/2 p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-md   "
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet"
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
                  disabled={disabled}
                  className="primary-btn font-roboto bg-[#FE8840] text-white p-3 rounded-[25px] cursor-pointer transition"
                >
                  Envoyer
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
    </>
  );
};
