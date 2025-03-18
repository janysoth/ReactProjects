"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});

  const [airQuality, setAirQuality] = useState({});

  // Daily Forecast
  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");

      setForecast(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error in fetching forecast data: ", error.message);
    }
  };

  // Ai quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

      setAirQuality(res.data);
    } catch (error) {
      console.log("Error in fetching air quality data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
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

