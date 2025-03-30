"use client";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>  
  );
}
