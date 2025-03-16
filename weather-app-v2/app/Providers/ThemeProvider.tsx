"use client";

import { GlobalContextProvider } from "@/app/Context/globalContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  // Delay the rendering until the client is mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If it's not mounted yet, return null to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </NextThemesProvider>
  );
}