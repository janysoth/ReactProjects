"use client"
import React from 'react';

import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useGlobalContext } from '../Context/globalContext';
import { sun } from '../utils/Icons';

const UvIndex = () => {
  const { uvIndex } = useGlobalContext();

  if (!uvIndex || !uvIndex.daily)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const { daily } = uvIndex;
  const uvIndexMax = daily.uv_index_max?.[0]?.toFixed(0) || "0";

  const uvIndexCategory = (index: number) => {
    if (index <= 2)
      return { text: "Low", protection: "No protection required" };
    if (index <= 5)
      return { text: "Moderate", protection: "Stay in the shade near mid-day" };
    if (index <= 7)
      return { text: "High", protection: "Wear a hat and sunglasses" };
    if (index <= 10)
      return { text: "Very High", protection: "Apply sunscreen SPF 30+ every 2 hours" };
    return { text: "Extreme", protection: "Avoid being outside" };
  };

  const uvIndexValue = Number(uvIndexMax);
  const marginLeftPercentage = (uvIndexValue / 14) * 100;
  const uvCategory = uvIndexCategory(uvIndexValue);

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sun} Uv Index</h2>

        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexValue}
            <span className="text-sm"> ({uvCategory.text})</span>
          </p>

          <Progress value={marginLeftPercentage} max={14} className='progress' />
        </div>
      </div>

      <p className="text-sm">{uvCategory.protection}</p>
    </div>
  )
}

export default UvIndex;