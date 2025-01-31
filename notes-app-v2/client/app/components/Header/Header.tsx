"use client"
import { useUserContext } from '@/context/userContext';
import { github, moon, profile } from '@/utils/Icons';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { user } = useUserContext();

  const { name } = user;
  const userId = user._id;

  return (
    <header className="px-6 py-4 w-full flex flex-col sm:flex-row items-center justify-between bg-[#f9f9f9] shadow-md">
      {/* Left Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">👋 &nbsp;</span>
          {userId ? `Welcome, ${name}!` : "Welcome to Note App"}
        </h1>

        <p className="text-sm mt-1">
          {userId ? (
            <>
              You have {" "}
              <span className="font-bold text-[#3aafae]">5</span>
              {" "} active tasks.
            </>
          ) : (
            "Please login or register to view your tasks."
          )}
        </p>
      </div>

      {/* Right Section */}
      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-center sm:gap-8 w-full sm:w-auto">
        <button
          className="w-full sm:w-auto px-6 py-2 bg-[#3aafae] text-white rounded-full hover:bg-[#00A1F1] transition-all duration-200 ease-in-out text-sm sm:text-base"
          onClick={() => { }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link
            href="https://github.com/janysoth"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] hover:bg-[#E6E6E6]"
          >
            {github}
          </Link>

          <Link
            href="https://github.com/janysoth"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] hover:bg-[#E6E6E6]"
          >
            {moon}
          </Link>

          <Link
            href="https://github.com/janysoth"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] hover:bg-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;