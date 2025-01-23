"use client";

import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";

export default function Home() {
  useRedirect("/login");

  const {
    logoutUser,
    user,
    handleUserInput,
    userState,
    updateUser,
    emailVerification
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  const [isOpen, setIsOpen] = useState(false);

  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-8 px-4 sm:px-8 md:px-16">
      <header className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
          Welcome <span className="text-red-600">{name}</span>
        </h1>

        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-10 h-10 rounded-full"
          />

          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base"
              onClick={emailVerification}
            >
              Verify Account
            </button>
          )}

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm md:text-base"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mt-8">
        <p className="text-gray-600 text-lg md:text-xl text-center md:text-left">{bio}</p>

        <h1 className="mt-6">
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm md:text-base"
          >
            Update Bio
          </button>
        </h1>

        {isOpen && (
          <form className="mt-4 px-8 py-4 max-w-[520px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>

              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-2 rounded-md outline-green-500 text-gray-800 text-sm"
                onChange={(e) => handleUserInput("bio")(e)}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                updateUser(e, { bio: userState.bio });
                myToggle();
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base"
            >
              Submit
            </button>
          </form>
        )}
      </section>
    </main>
  );
}