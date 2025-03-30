"use client";

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { gauge } from '../utils/Icons';

const Pressure = () => {
  const { forecast } = useGlobalContext();

  if (!forecast?.main?.pressure)
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />
    );

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000)
      return "Very Low: Risk of flooding.";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure: Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure: Stable weather.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure: Clear skies.";

    if (pressure >= 1040)
      return "Very High: Risk of drought.";

    return "Unknown pressure level";
  }
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>

        <p className="pt-4 text-2xl">
          {pressure} hPa
        </p>
      </div>

      <p className="text-sm">
        {getPressureDescription(pressure)}
      </p>
    </div>
  )
}

export default Pressure