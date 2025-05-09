"use client"
import { metadata } from "@/app/metadata";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { useUserContext } from "@/context/userContext";
import MainContentLayout from "@/providers/MainContentLayout";
import MainLayout from "@/providers/MainLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import UserProvider from "@/providers/UserProvider";
import Header from "./components/Header/Header";
import MiniSidebar from "./components/MiniSidebar/MiniSidebar";
import "./globals.css";

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
          {/* Always render the Toaster */}
          <Toaster position="top-center" />
          <LayoutContent>{children}</LayoutContent>
        </UserProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { userLoginStatus } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const loggedIn = await userLoginStatus();
      setIsLoggedIn(loggedIn);
    }
    checkLoginStatus();
  }, [userLoginStatus]);

  if (!isLoggedIn) return children;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden Layout-view">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Render MiniSidebar at the top on larger screens */}
        <div className="hidden md:block">
          <MiniSidebar />
        </div>
        <div className="flex-1 flex overflow-hidden">
          <MainContentLayout>
            <MainLayout className="w-full">
              {children}
            </MainLayout>
            <div className="hidden md:block">
              <SidebarProvider />
            </div>
          </MainContentLayout>
        </div>
      </div>
      {/* Render MiniSidebar at the bottom on small screens */}
      <div className="md:hidden">
        <MiniSidebar isHorizontal />
      </div>
    </div>
  );
}