"use client";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import menu from "@/app/utils/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useGlobalState } from "../Context/globalProvider";

const Sidebar = () => {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    if (pathname !== link) {
      router.push(link);
    }
  };

  return (
    <nav
      className={`relative flex flex-col justify-between bg-${theme?.colorBg2} border-2 border-${theme?.borderColor2} rounded-xl transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        } h-screen p-4`}
    >
      {/* Profile Section - Always Show Image */}
      <div className="relative flex items-center justify-center p-2 rounded-xl cursor-pointer transition-all duration-300">
        <div className="relative w-50 h-50 flex-shrink-0">
          <Image
            src="/profile.jpeg"
            alt="Profile"
            width={70}
            height={70}
            priority
            className="rounded-full object-cover border-1 border-gray-300"
          />
        </div>
        {/* Show name only if not collapsed */}
        {!collapsed && (
          <h1 className="ml-4 text-lg font-semibold text-white">
            <span>Jonny</span> <br />
            <span>Soth</span>
          </h1>
        )}
      </div>

      {/* Navigation Items */}
      <ul className="flex flex-col space-y-1">
        {menu.map((item) => {
          const link = item.link;
          const isActive = pathname === item.link;
          return (
            <li
              key={item.id}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive
                ? "bg-green-700 text-white"
                : "hover:bg-gray-800 hover:text-gray-200"
                }`}
              onClick={() => handleClick(link)}
            >
              {item.icon}
              {!collapsed && <Link href={item.link}>{item.title}</Link>}
            </li>
          );
        })}
      </ul>

      {/* Toggle Button */}
      <button
        className="absolute top-6 right-[-50px] p-2 bg-gray-800 text-white rounded-r-lg shadow-md transition-all duration-300 hover:bg-gray-700"
        onClick={collapseMenu}
      >
        {collapsed ? bars : arrowLeft}
      </button>
    </nav>
  );
};

export default Sidebar;