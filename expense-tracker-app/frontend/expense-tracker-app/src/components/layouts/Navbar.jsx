import { Coins } from "lucide-react";
import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

import { useNavigate } from "react-router-dom";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {

  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
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

      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')} >
        <Coins size={24} className="text-primary mr-2" />
        <h2 className='font-bold text-xl text-primary'>
          SmartSpend
        </h2>
      </div>

      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;