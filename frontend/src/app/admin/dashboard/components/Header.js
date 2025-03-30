"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/admin/login");
  };

  return (
    <header className="bg-[#F4F5FA]">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Image
            src="/images/admin-dashboard-logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="ml-auto flex items-center gap-4 relative">
          {/* <button
            onClick={toggleDropdown}
            className="rounded-xl p-2 hover:bg-gray-200 cursor-pointer"
          >
            Profile
          </button> */}

          <button
            onClick={logout}
            className="rounded-xl p-2 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
