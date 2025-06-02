import { Coins } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";

// Helper to format date and time
const getFormattedDateTime = (date) => ({
  date: date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  time: date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }),
});

const Navbar = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { date: formattedDate, time: formattedTime } = getFormattedDateTime(currentDateTime);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex justify-between items-center relative">
        {/* Left side */}
        <div className="flex items-center gap-5 min-w-0">
          <button
            aria-label="Toggle Menu"
            className="block lg:hidden text-black"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl cursor-pointer" />
            ) : (
              <HiOutlineMenu className="text-2xl cursor-pointer" />
            )}
          </button>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Coins size={24} className="text-primary mr-2" />
            <h2 className="font-bold text-xl text-primary">SmartSpend</h2>
          </div>
        </div>

        {/* Center (Date/Time) */}
        <div className="hidden md:flex justify-center flex-grow text-gray-700 font-medium">
          {formattedDate}, {formattedTime}
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end min-w-0">
          <button
            aria-label="Logout"
            onClick={handleLogout}
            className="group flex items-center overflow-hidden bg-primary text-white pl-3 pr-3 py-2 rounded hover:bg-red-500/90 transition-all duration-300 w-10 hover:w-28 cursor-pointer"
          >
            <LuLogOut className="text-lg flex-shrink-0" />
            <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Side menu (mobile) */}
      {openSideMenu && (
        <>
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black opacity-25 z-20"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed top-[61px] left-0 bg-white z-30">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
