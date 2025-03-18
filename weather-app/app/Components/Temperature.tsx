"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Temperature = () => {
  const { forecast } = useGlobalContext();

  // Ensure forecast is valid before accessing properties
  if (!forecast || !forecast.main || !forecast.weather?.length) {
    return <div>Loading...</div>;
  }

  const { main, timezone = 0, name, weather, coord } = forecast;

  const temp = kelvinToCelsius(main?.temp ?? 0);
  const minTemp = kelvinToCelsius(main?.temp_min ?? 0);
  const maxTemp = kelvinToCelsius(main?.temp_max ?? 0);

  // Hooks should always be called in the same order
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Ensure weather[0] exists before destructuring
  const weatherDetails = weather[0] || {};
  const weatherMain = weatherDetails.main ?? "Clear";
  const description = weatherDetails.description ?? "";

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  useEffect(() => {
    const updateLocalTime = () => {
      const localMoment = moment().utcOffset(timezone / 60);
      setLocalTime(localMoment.format("HH:mm A"));
      setCurrentDay(localMoment.format("dddd"));
      setCurrentDate(localMoment.format("MMMM D, YYYY"));
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  const handleNavigate = () => {
    if (coord?.lat && coord?.lon) {
      window.open(`https://www.google.com/maps?q=${coord.lat},${coord.lon}`, "_blank");
    } else {
      console.log("Latitude and Longitude are not available.");
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{currentDate}</span>
        <span className="font-medium">{localTime}</span>
      </p>

      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span className="cursor-pointer" onClick={handleNavigate}>
          {navigation}
        </span>
      </p>

      <p className="py-10 text-9xl font-bold self-center">{temp}°c</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°c</span>
          <span>High: {maxTemp}°c</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;