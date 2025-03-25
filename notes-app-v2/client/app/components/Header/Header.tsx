"use client"
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import React, { useState } from 'react'; // Added useState for menu toggle
import { FaBars, FaGithub, FaMoon, FaUser } from "react-icons/fa"; // Added FaBars for the menu button
import IconLink from '../IconLink/IconLink';

const Header = () => {
  const { user } = useUserContext();
  const { name } = user;
  const userId = user._id;

  const { activeTasks, openModalForAdd } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 w-full flex flex-col sm:flex-row items-center justify-between bg-[#f9f9f9] rounded-[1.5rem] shadow-md bg-[url('/flurry.png')] bg-repeat bg-fill">
      {/* Left Section */}
      <div className=" sm:w-auto flex items-center justify-between sm:justify-start">
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-medium">
            <span role="img" aria-label="wave">👋 &nbsp;</span>
            {userId ? `Welcome, ${name}!` : "Welcome to Note App"}
          </h1>

          <p className="text-sm sm:text-base mt-1">
            {userId ? (
              <>
                You have {" "}
                <span className="font-bold text-[#3aafae]">{activeTasks.length}</span>
                {" "} active tasks.
              </>
            ) : (
              "Please login or register to view your tasks."
            )}
          </p>
        </div>

        {/* Menu Button (Visible only on small screens) */}
        <button
          className="sm:hidden p-2 text-gray-700 hover:text-[#3aafae] focus:outline-none"
          onClick={toggleMenu}
        >
          <FaBars className="w-6 h-6 ml-[6rem]" />
        </button>
      </div>

      {/* Right Section (Hidden on small screens unless menu is open) */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto mt-4 sm:mt-0`}
      >
        <button
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#3aafae] text-white rounded-full hover:bg-[#00A1F1] transition-all duration-200 ease-in-out text-sm sm:text-base"
          onClick={openModalForAdd}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        {/* Icon Links */}
        {userId && (
          <div className="flex gap-4 mt-4 sm:mt-0">
            <IconLink
              href="https://github.com/janysoth"
              icon={<FaGithub />}
            />

            <IconLink
              href="https://github.com/janysoth"
              icon={<FaMoon />}
            />

            <IconLink
              href="https://github.com/janysoth"
              icon={<FaUser />}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;