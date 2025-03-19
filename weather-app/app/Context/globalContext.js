"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  // Daily Forecast
  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");

      setForecast(res.data);
    } catch (error) {
      console.log("Error in fetching forecast data: ", error.message);
    }
  };

  // Air quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution`);

      setAirQuality(res.data);
    } catch (error) {
      console.log("Error in fetching air quality data: ", error.message);
    }
  };

  // Five Day Forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error in fetching FiveDayForecast data in globalContext: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
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

