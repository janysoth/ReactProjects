"use client"

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import React from 'react';
import { useGlobalContext } from '../Context/globalContext';
import { clearSky, cloudy, drizzleIcon, rain, snow } from '../utils/Icons';
import { kelvinToCelsius } from '../utils/misc';

const DailyForecast = () => {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  if (!forecast || !weather)
    return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // Filter the list for today's forecast
  const todayForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  const { main: weatherMain } = weather[0];

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

  if (todayForecast.length < 1)
    return <Skeleton className="h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 skeleton-animate" />

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className='h-full flex gap-10 overflow-hidden'>
        {todayForecast.length < 1 ? (
          <div className='flex justify-center items-center'>
            <h1 className='text-[3rem] line-through text-rose-500'>
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className='w-full'>
            <Carousel>
              <CarouselContent>
                {todayForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-1/3 cursor-grab items-center"
                      >
                        <p className=" text-gray-300">
                          {moment(forecast.dt_txt).format("hh:mm A")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {kelvinToCelsius(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyForecast