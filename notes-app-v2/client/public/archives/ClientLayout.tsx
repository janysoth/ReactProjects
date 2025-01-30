"use client";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/app/components/Header/Header";
import MiniSidebar from "@/app/components/MiniSidebar/MiniSidebar";
import { metadata } from "@/app/metadata";
import { useUserContext } from "@/context/userContext";
import MainContentLayout from "@/providers/MainContentLayout";
import MainLayout from "@/providers/MainLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import UserProvider from "@/providers/UserProvider";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
        <title>{metadata.title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Toaster position="top-center" />
          <UserStatusWrapper>{children}</UserStatusWrapper>
        </UserProvider>
      </body>
    </html>
  );
}

function UserStatusWrapper({ children }: { children: React.ReactNode }) {
  const { userLoginStatus, user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await userLoginStatus();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, [user]);

  return (
    <div className="h-full flex overflow-hidden">
      {isLoggedIn ? (
        <div className="h-full flex overflow-hidden">
          <MiniSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <MainContentLayout>
              <MainLayout>{children}</MainLayout>
              <SidebarProvider />
            </MainContentLayout>
          </div>
        </div>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}