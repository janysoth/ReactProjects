"use client"

import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { thermo } from '../utils/Icons';
import { airQualityIndexText } from '../utils/misc';

const AirPollution = () => {
  const { airQuality } = useGlobalContext();

  // Check if airQuality is available, and if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  )
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find(item => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
  );
}

export default AirPollution