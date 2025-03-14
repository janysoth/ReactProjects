"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

import { GlobalContextProvider } from "@/app/context/globalContext";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </NextThemesProvider>
  );
}