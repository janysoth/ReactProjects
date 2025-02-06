"use client";
import { useUserContext } from '@/context/userContext';
import useRedirect from '@/hooks/useUserRedirect';
import React from 'react';
import LoginForm from "../components/auth/LoginForm";

function Page() {
  const { user } = useUserContext();

  if (user) {
    useRedirect('/'); // Directly call the hook if user is logged in
    return null; // Prevent rendering the login page
  }

  return (
    <div className='auth-page w-full h-full flex justify-center items-center'>
      <LoginForm />
    </div>
  );
}

export default Page;