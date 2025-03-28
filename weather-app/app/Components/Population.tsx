"use client";

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { people } from '../utils/Icons';
import { formatNumber } from '../utils/misc';

const Population = () => {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people} Population:
        </h2>

        <p className="pt-4 text-2xl">
          {formatNumber(city.population)} people
        </p>

        <p className="pt-4 text-sm">
          Latest UN population data for {city.name}.
        </p>
      </div>
    </div>
  )
}

export default Population