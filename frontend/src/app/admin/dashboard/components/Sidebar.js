"use client";

import Link from "next/link";
import {
  Home,
  Users,
  BookA,
} from "lucide-react";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/dashboard/users" },
  { icon: BookA, label: "Subjects", href: "/admin/dashboard/subjects" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-16 bg-[#F4F5FA] border-r border-gray-200 flex flex-col items-center py-4">
      <div className="flex flex-col items-center space-y-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center p-3 rounded-md text-gray-600 
                ${
                  isActive
                    ? "bg-[#0772AA] text-white"
                    : "hover:bg-blue-100"
                }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
