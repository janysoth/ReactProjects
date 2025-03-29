"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { thermometer } from '../utils/Icons';
import { kelvinToCelsius } from '../utils/misc';

const FeelsLike = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5)
      return "Feels significantly colder than the actual temperature.";

    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5)
      return "Feels close to the actual temperature.";

    if (feelsLike > avgTemp)
      return "Feels significantly warmer than the actual temperature.";

    return "Feels like temperature is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°c</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  )
}

export default FeelsLike