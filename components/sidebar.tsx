"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FaUser, FaTachometerAlt, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  console.log(router);
  const currentPath = "/dashboard";

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt className="h-4 w-4" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser className="h-4 w-4" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell className="h-4 w-4" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog className="h-4 w-4" />,
    },
    {
      name: "Help",
      path: "/help",
      icon: <FaQuestionCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full h-full border-r flex flex-col gap-2 p-2 space-y-1">
      {navItems.map((item) => (
        <Link href={item.path} key={item.path} legacyBehavior>
          <Button
            className={`w-full justify-start px-4 py-3 rounded-md transition-all ${currentPath === item.path ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-600 hover:bg-gray-100"}`}
            variant="ghost"
          >
            <span className="flex items-center gap-3">
              <span className={`${currentPath === item.path ? "text-orange-500" : "text-gray-500"}`}>{item.icon}</span>
              {item.name}
            </span>
          </Button>
        </Link>
      ))}

      <div className="mt-auto mb-4">
        <Button className="w-full justify-start px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100" variant="ghost">
          <span className="flex items-center gap-3">
            <FaSignOutAlt className="h-4 w-4 text-gray-500" />
            Sign Out
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
