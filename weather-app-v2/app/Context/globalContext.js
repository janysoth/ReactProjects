"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");

      setForecast(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error in fetching forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{}}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

