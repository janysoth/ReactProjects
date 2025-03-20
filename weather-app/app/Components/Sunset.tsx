"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { sunriseIcon, sunsetIcon } from '../utils/Icons';
import { unixToTime } from '../utils/misc';

const Sunset = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const sunsetTime = forecast?.sys?.sunset;
  const sunriseTime = forecast?.sys?.sunrise;
  const timezone = forecast?.timezone;

  const sunset = unixToTime(sunsetTime, timezone);
  const sunrise = unixToTime(sunriseTime, timezone);

  return (
    <div className="pt-4 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {sunsetIcon} Sunset:
        </h2>

        <p className="pt-2 text-2xl">
          {sunset}
        </p>
      </div>

      <div className="bottom">
        <h2 className="flex items-center gap-2 font-medium">
          {sunriseIcon} Sunrise:
        </h2>

        <p className="pt-2 text-2xl">
          {sunrise}
        </p>
      </div>
    </div>

  )
}

export default Sunset