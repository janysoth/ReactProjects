import { Coins } from "lucide-react";
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import SideMenu from './SideMenu';

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

  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-7 sticky top-0 z-50">
        <div className="flex justify-between items-center relative">
          {/* Left side */}
          <div className="flex items-center gap-5 min-w-0">
            <button
              className="block lg:hidden text-black cursor-pointer"
              onClick={() => setOpenSideMenu(!openSideMenu)}
            >
              {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
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

          {/* Center */}
          <div className="absolute left-1/2 transform -translate-x-1/3 text-gray-700 font-medium hidden md:block text-center">
            {formattedDate}, {formattedTime}
          </div>

          {/* Right side */}
          <div className="flex items-center justify-end min-w-0">
            <button
              onClick={handleLogout}
              className="group flex items-center overflow-hidden bg-primary text-white pl-3 pr-3 py-2 rounded-full hover:bg-red-500/90 transition-all duration-300 w-10 hover:w-28 cursor-pointer"
            >
              <LuLogOut className="text-lg" />
              <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SideMenu + overlay */}
      <SideMenu
        isOpen={openSideMenu}
        setIsOpen={setOpenSideMenu}
        activeMenu={activeMenu}
      />

      {openSideMenu && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpenSideMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;