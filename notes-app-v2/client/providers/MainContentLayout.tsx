"use client"
import React from 'react';

import { useUserContext } from '@/context/userContext';

interface MainContentLayoutProps {
  children: React.ReactNode;
}

const MainContentLayout = ({ children }: MainContentLayoutProps) => {
  const userId = useUserContext()?.user?._id;

  return (
    <main className={`${userId ? "lg:pr-[20rem] md:pr-[20rem]" : ""} pb-[1.5rem] flex h-full flex-1`}>
      {children}
    </main>
  )
}

export default MainContentLayout