"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { User, Lock } from "lucide-react";
import { Alert } from "antd";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("data");

    if (token && data) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors({});
    const formData = { email, password };

    try {
      const response = await fetch(`${serverBaseUrl}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        localStorage.setItem("token", responseData?.response?.token);
        localStorage.setItem("data", JSON.stringify(responseData?.response?.data));
        router.push("/admin/dashboard")
      } else if (response.status === 403) {
        const error = typeof responseData.error;
        if (error === "object") {
          setErrors(responseData.error);
        } else {
          setAlertMessage(responseData.message || "An error occurred");
          setTimeout(() => setAlertMessage(false), 3000);
        }
      } else {
        setAlertMessage(
          responseData.message || "Login failed. Please try again"
        );
        setTimeout(() => setAlertMessage(false), 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row overflow-hidden">
      <div className="flex-1 flex relative top-32 justify-center p-8 lg:p-16">
        {alertMessage && (
          <div
            className="absolute left-1/2 translate-x-[-50%]"
            style={{ zIndex: 1050, top: "2%", width: "50%" }}
          >
            <Alert
              closable
              showIcon
              message={alertMessage}
              type="error"
              onClose={() => setAlertMessage(false)}
            />
          </div>
        )}
        <div className="w-full max-w-md space-y-8">
          <div className="mb-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-[#525252] my-3">
              How to I get started lorem ipsum dolor at?
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                placeholder="email"
                className="pl-10 bg-[#FCC9AA9C] rounded-xl py-3 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.email && (
                <p className="joi-error-message">{errors?.email[0]}</p>
              )}
            </div>

            <div className="relative mb-0">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 bg-[#FCC9AA9C] rounded-xl py-3 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors?.password && (
              <p className="joi-error-message">{errors?.password[0]}</p>
            )}

            <div className="flex items-center justify-center w-full mt-4">
              <button
                className="bg-[#0772AA] hover:bg-[#077999] rounded-xl px-6 py-3 text-white"
                disabled={disabled}
                type="submit"
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 relative admin-login-bg hidden lg:block">
        <div className="relative z-10 flex items-center h-full right-5">
          <img
            src="/images/admin/login-students.svg"
            alt="Children illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
