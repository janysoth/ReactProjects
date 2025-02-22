"use client";

import React, { createContext, useContext, useState } from "react";

import themes from "./themes";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedThem] = useState(0);
  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider value={{
      theme,
    }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};