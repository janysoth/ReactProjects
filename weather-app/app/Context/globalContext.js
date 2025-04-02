"use client";

import React, { createContext, use, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ]);

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

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

  // Fetch UV Data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv`);

      setUvIndex(res.data);
    } catch (error) {
      console.log("Error in fetching the UV Data in globalContext.js: ", error);
    }
  };

  // Handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "")
      setGeoCodedList(defaultStates);
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

