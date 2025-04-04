"use client"
import React from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useGlobalContext } from '../Context/globalContext';
import { clearSky, cloudy, drizzleIcon, rain, snow } from '../utils/Icons';
import { kelvinToCelsius } from '../utils/misc';

const DailyForecast = () => {
  const { forecast, fiveDayForecast } = useGlobalContext();

  if (!fiveDayForecast?.city || !fiveDayForecast?.list || !forecast?.weather)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const todayString = new Date().toISOString().split("T")[0];

  // Filter the list for today's forecast
  const todayForecast = fiveDayForecast.list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => forecast.dt_txt.startsWith(todayString)
  );

  if (todayForecast.length < 1) {
    return (
      <div className="h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 flex justify-center items-center">
        <h1 className="text-[3rem] line-through text-rose-500">
          No Data Available!
        </h1>
      </div>
    );
  }

  const { main: weatherMain } = forecast.weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle": return drizzleIcon;
      case "Rain": return rain;
      case "Snow": return snow;
      case "Clear": return clearSky;
      case "Clouds": return cloudy;
      default: return clearSky;
    }
  };

  const formatTime = (dateTime: string) => {
    return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      .format(new Date(dateTime))
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        <Carousel aria-label="Daily Weather Forecast">
          <CarouselContent>
            {todayForecast.map(({ dt_txt, main }: { dt_txt: string; main: { temp: number } }) => (
              <CarouselItem
                key={dt_txt}
                className="flex flex-col gap-4 basis-1/4 cursor-grab items-center"
              >
                <p>{formatTime(dt_txt)}</p>
                <p>{getIcon()}</p>
                <p className="mt-4">{kelvinToCelsius(main.temp)}°c</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default DailyForecast;