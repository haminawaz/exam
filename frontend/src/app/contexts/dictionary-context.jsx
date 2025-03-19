"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";


import { UserAuthContext } from "./auth-context";
import { getDictionary } from "@/app/lib/dictionary";
import { Spinner } from "../components/ui/spinner";

const DictionaryContext = createContext(undefined);

export const DictionaryContextProvider = ({ children }) => {
  const { lng } = UserAuthContext();
  const [dictionaries, setDictionaries] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchedDictionaries = useMemo(async () => {
    const createDictionary = await getDictionary(lng ?? "french");
    return {
      createDictionary,
    };
  }, [lng]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    fetchedDictionaries.then(({ createDictionary }) => {
      setDictionaries(createDictionary);
      setIsLoading(false); // End loading
    });
  }, [fetchedDictionaries]);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <DictionaryContext.Provider
      value={{
        dictionaries,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

export const DictionariesContext = () => {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error(
      "DictionariesContext must be used within a DictionaryContext Provider"
    );
  }
  return context;
};
