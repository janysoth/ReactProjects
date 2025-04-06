"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React, { useMemo } from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { thermometer } from '../utils/Icons';

const FeelsLike = () => {
  const { forecast, unit, convertedTemp } = useGlobalContext();

  const feels_like = forecast?.main?.feels_like;
  const temp_min = forecast?.main?.temp_min;
  const temp_max = forecast?.main?.temp_max;

  const feelsLikeText = (feelsLike: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) return "Feels significantly colder than the actual temperature.";
    if (Math.abs(feelsLike - avgTemp) <= 5) return "Feels close to the actual temperature.";
    return "Feels significantly warmer than the actual temperature.";
  };

  const feelsLikeDescription = useMemo(() => {
    if (feels_like == null || temp_min == null || temp_max == null) return "";
    return feelsLikeText(feels_like, temp_min, temp_max);
  }, [feels_like, temp_min, temp_max]);

  if (feels_like == null)
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />
    );

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{convertedTemp(feels_like)}°{unit}</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
};

export default FeelsLike;