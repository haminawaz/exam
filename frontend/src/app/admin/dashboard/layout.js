"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("data");

      if (!token || !data) {
        router.push("/admin/login");
      }
    }
  }, [router]);

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
