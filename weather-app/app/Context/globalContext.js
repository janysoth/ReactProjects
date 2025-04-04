"use client";

import axios from 'axios';
import { debounce } from 'lodash';
import React, { createContext, useContext, useEffect, useState } from 'react';

import defaultStates from "../utils/defaultStates";
import { kelvinToCelsius, kelvinToFahrenheit } from '../utils/misc';

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

  const [unit, setUnit] = useState("C");

  // Toggle Temperature unit
  const toggleUnit = () => setUnit((prev) => (prev === "C" ? "F" : "C"));

  // Convert temperature based on the selected unit
  const convertedTemp = (kelvin) =>
    unit === "C" ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);

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

  // Fetch geoCodedList
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error in fetching geoCoded List in globalContext: ", error.message);
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

  // Debounce function from lodash
  useEffect(() => {
    const debounceFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue)
      debounceFetch(inputValue);

    // Cleanup function
    return () => debounceFetch.cancel();
  }, [inputValue]);

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
        unit,
        toggleUnit,
        convertedTemp,
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

