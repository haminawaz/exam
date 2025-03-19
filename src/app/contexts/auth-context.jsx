"use client";


import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Spinner } from "../components/ui/spinner";
const AuthContext = createContext(undefined);
export const AuthContextProvider = ({ children }) => {
  const [lng, setLng] = useState("french");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const chkLng = localStorage.getItem("iwesable-lng");
    if (chkLng) {
      setLng(chkLng);
    }
    setLoading(false);
  }, [lng]);
  if (!lng || loading) {
    return (
      <div className="flex flex-row items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        lng,
        setLng,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  return context;
};
