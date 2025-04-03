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
    11.4592, 104.9447,
  ]);

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  // Daily Forecast
  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log("Error in fetching forecast data: ", error.message);
    }
  };

  // Air quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

      setAirQuality(res.data);
    } catch (error) {
      console.log("Error in fetching air quality data: ", error.message);
    }
  };

  // Five Day Forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error in fetching FiveDayForecast data in globalContext: ", error.message);
    }
  };

  // Fetch UV Data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

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
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
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

