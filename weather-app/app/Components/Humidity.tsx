"use client";

import React, { useMemo } from "react";

import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../Context/globalContext";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.main || forecast.main.humidity === undefined)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />;


  const { humidity } = forecast.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity < 50) return "Comfortable: Ideal for health and comfort";
    if (humidity < 70) return "Moderate: Sticky, may increase allergies";
    return "High: Uncomfortable, mold growth risk";
  };

  const humidityText = useMemo(() => getHumidityText(humidity), [humidity]);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{humidityText}.</p>
    </div>
  );
}

export default Humidity;