import { Coins } from "lucide-react";
import React, { useContext, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuLogOut, } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-5">
        <button
          className='block lg:hidden text-black'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className='text-2xl cursor-pointer' />
          ) : (
            <HiOutlineMenu className='text-2xl cursor-pointer' />
          )}
        </button>

        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <Coins size={24} className="text-primary mr-2" />
          <h2 className='font-bold text-xl text-primary'>SmartSpend</h2>
        </div>
      </div>

      {/* Right side */}
      <button
        onClick={handleLogout}
        className="group flex items-center overflow-hidden bg-primary text-white pl-3 pr-3 py-2 rounded hover:bg-red-500/90 transition-all duration-300 w-10 hover:w-28 cursor-pointer"
      >
        <LuLogOut className="text-lg flex-shrink-0" />
        <span
          className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-2 transition-all duration-300"
        >
          Logout
        </span>
      </button>

      {/* Side menu (mobile) */}
      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;