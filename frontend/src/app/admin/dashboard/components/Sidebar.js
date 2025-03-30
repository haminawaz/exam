// "use client";

// import Link from "next/link";
// import {
//   Home,
//   Mail,
//   Calendar,
//   Users,
//   Layers,
//   MessageSquare,
//   Grid,
//   Settings,
// } from "lucide-react";
// import { usePathname } from "next/navigation";

// // const sidebarItems = [
// //   { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard#dashboard" },
// //   { icon: Users, label: "User Management", href: "/admin/dashboard#user" },
// //   { icon: CreditCard, label: "Payments", href: "/admin/dashboard#credit" },
// //   { icon: Package, label: "Products", href: "/admin/dashboard#packages" },
// //   { icon: ChartBar, label: "Analytics", href: "/admin/dashboard#chart" },
// //   { icon: Settings, label: "Settings", href: "/admin/dashboard#settings" },
// // ];

// export const Sidebar = () => {
//   // const pathname = usePathname();

//   return (
//     <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
//       <div className="flex flex-col items-center space-y-6">
//         <button className="text-gray-600 hover:text-blue-500">
//           <Home className="h-5 w-5" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-500">
//           <Mail className="h-5 w-5" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-500">
//           <Calendar className="h-5 w-5" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-500">
//           <Users className="h-5 w-5" />
//         </button>
//         <button className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
//           <Layers className="h-5 w-5 text-white" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-500">
//           <MessageSquare className="h-5 w-5" />
//         </button>
//         <button className="text-gray-600 hover:text-blue-500">
//           <Grid className="h-5 w-5" />
//         </button>
//       </div>
//       <div className="mt-auto">
//         <button className="text-gray-600 hover:text-blue-500">
//           <Settings className="h-5 w-5" />
//         </button>
//       </div>
//     </aside>
//   );
// };

"use client";

import Link from "next/link";
import {
  Home,
  Mail,
  Calendar,
  Users,
  Layers,
  MessageSquare,
  Grid,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

// Sidebar items array
// const sidebarItems = [
//   { icon: Home, label: "Home", href: "/home" },
//   { icon: Mail, label: "Messages", href: "/messages" },
//   { icon: Calendar, label: "Calendar", href: "/calendar" },
//   { icon: Users, label: "Users", href: "/users" },
//   { icon: Layers, label: "Dashboard", href: "/dashboard" },
//   { icon: MessageSquare, label: "Chats", href: "/chats" },
//   { icon: Grid, label: "Grid", href: "/grid" },
//   { icon: Settings, label: "Settings", href: "/settings" },
// ];

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Mail, label: "User Management", href: "/admin/dashboard/user" },
  { icon: Calendar, label: "Payments", href: "/admin/dashboard/credit" },
  { icon: Users, label: "Products", href: "/admin/dashboard/packages" },
  { icon: Layers, label: "Analytics", href: "/admin/dashboard/chart" },
  { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
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
