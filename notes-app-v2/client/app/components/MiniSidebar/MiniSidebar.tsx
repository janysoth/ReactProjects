"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { logout } from "@/utils/Icons";
import Link from "next/link";
import Tooltip from "../Tooltip/Tooltip";

interface MiniSidebarProps {
  isHorizontal?: boolean;
}

const MiniSidebar: React.FC<MiniSidebarProps> = ({ isHorizontal = false }) => {
  const { logoutUser, user } = useUserContext();
  const { tasks, deleteAllTasks } = useTasks();
  const userId = user?._id;
  const pathname = usePathname();

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const navItems = [
    { title: "All", link: "/", Icon: IconGrid },
    { title: "Completed", link: "/completed", Icon: IconFileCheck },
    { title: "Pending", link: "/pending", Icon: IconCheck },
    { title: "Overdue", link: "/overdue", Icon: IconStopwatch },
  ];

  return (
    <div
      className={`${isHorizontal
        ? "fixed bottom-0 left-0 right-0 flex-row items-center justify-between p-8 shadow-lg"
        : "basis-[5rem] flex flex-col rounded-[1.5rem] shadow-md bg-[url('/flurry.png')] bg-repeat bg-fill"
        }`}
    >
      {/* Logo - Only shown in vertical layout */}
      {!isHorizontal && (
        <div className="flex items-center justify-center h-[5rem]">
          <Link href="/">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                sizes="28px"
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div
        className={`${isHorizontal
          ? "flex-1 flex flex-row items-center justify-center gap-6"
          : "m-4 flex flex-1 flex-col items-center justify-between"
          }`}
      >
        <ul className={`flex ${isHorizontal ? "flex-row gap-6" : "flex-col gap-10"}`}>
          {navItems.map(({ title, link, Icon }, index) => (
            <li key={index} className="relative group hover:text-red-500">
              <Link href={link}>
                <Icon strokeColor={pathname === link ? "#3aafae" : "#71717a"} />
              </Link>
              {/* Conditionally render Tooltip */}
              {!isHorizontal && <Tooltip text={title} />}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className={`${isHorizontal ? "flex flex-row gap-4" : "mt-[373px] flex flex-col gap-2"}`}>
          {/* Logout Button */}
          {userId && (
            <div className="relative group">
              <button
                className={`${isHorizontal
                  ? "w-10 h-10 p-1"
                  : "w-12 h-12 p-2"
                  } flex justify-center items-center border-2 border-[#EB4E31] rounded-full hover:bg-red-500`}
                onClick={handleLogout}
              >
                {logout}
              </button>
              {/* Conditionally render Tooltip */}
              {!isHorizontal && <Tooltip text="Logout" />}
            </div>
          )}
          {/* Delete All Button */}
          {tasks.length > 0 && (
            <div className="relative group">
              <button
                className={`${isHorizontal
                  ? "w-10 h-10 p-1"
                  : "w-12 h-12 p-2"
                  } flex justify-center items-center border-2 border-[#EB4E31] rounded-full hover:text-red hover:bg-red-500`}
                onClick={deleteAllTasks}
              >
                <IconDeleteAll strokeColor="black" />
              </button>
              {/* Conditionally render Tooltip */}
              {!isHorizontal && <Tooltip text="Delete All Tasks" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniSidebar;