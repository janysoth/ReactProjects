"use client";

import { lazy } from "react";
import FiveDayForecast from "./Components/FiveDayForecast";
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

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />

      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        {/* Left Section */}
        <section className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </section>

        {/* Right Section */}
        <section className="flex flex-col w-full">
          <div className="grid gap-4 col-span-full sm:col-span-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
          </div>
        </section>
      </div>
    </main>
  );
}