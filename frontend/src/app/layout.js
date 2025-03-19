"use client";
import "./globals.css";
import { Suspense, useState } from "react";

import { AuthContextProvider } from "./contexts/auth-context";
import { DictionaryContextProvider } from "./contexts/dictionary-context";
import { Spinner } from "./components/ui/spinner";
import QueryProvider from "./libs/query-provider";
import { Header } from "./public/Header";
import { TopMenue } from "./public/TopMenue";
import { Footer } from "./public/Footer";
import { Hero } from "./public/Hero";

export default function RootLayout({ children }) {
  const [activeSection, setActiveSection] = useState("default");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Quicksand:wght@300;400;700&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <QueryProvider>
            <AuthContextProvider>
              <DictionaryContextProvider>
                <main>
                  <Suspense
                    fallback={
                      <div className="w-full h-screen flex items-center justify-center">
                        <Spinner />
                      </div>
                    }
                  >
                    <Header />
                    <TopMenue setActiveSection={setActiveSection} />
                    <Hero activeSection={activeSection} />
                    {children}
                  </Suspense>
                </main>
                <Footer />
              </DictionaryContextProvider>
            </AuthContextProvider>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
