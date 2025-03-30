"use client";

import { lazy } from "react";

import Image from "next/image";
import FiveDayForecast from "./Components/FiveDayForecast";
import Mapbox from "./Components/Mapbox";
import Navbar from "./Components/Navbar";
import Temperature from "./Components/Temperature";

// Lazy-loaded components
const AirPollution = lazy(() => import("./Components/AirPollution"));
const DailyForecast = lazy(() => import("./Components/DailyForecast"));
const FeelsLike = lazy(() => import("./Components/FeelsLike"));
const Humidity = lazy(() => import("./Components/Humidity"));
const Population = lazy(() => import("./Components/Population"));
const Sunset = lazy(() => import("./Components/Sunset"));
const UvIndex = lazy(() => import("./Components/UvIndex"));
const Wind = lazy(() => import("./Components/Wind"));
const Visibility = lazy(() => import("./Components/Visibility"));
const Pressure = lazy(() => import("./Components/Pressure"));

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />

      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>

        <div className="flex flex-col w-full">
          <div className="grid gap-4 col-span-full sm:col-span-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>

          <div className="mapbox-com mt-4 flex gap-4">
            <Mapbox />

            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>

            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by
          <Image
            src={"/USAKhmer.png"}
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <a
            href="https://github.com/janysoth"
            target="_blank"
            className=" text-green-300 font-bold"
          >
            Jonny Vorn Soth
          </a>
        </p>
      </footer>
    </main>
  );
}