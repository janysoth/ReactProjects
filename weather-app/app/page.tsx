"use client";

import AirPollution from "./Components/AirPollution";
import DailyForecast from "./Components/DailyForecast";
import FeelsLike from "./Components/FeelsLike";
import FiveDayForecast from "./Components/FiveDayForecast";
import Humidity from "./Components/Humidity";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population";
import Sunset from "./Components/Sunset";
import Temperature from "./Components/Temperature";
import UvIndex from "./Components/UvIndex";
import Wind from "./Components/Wind";

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
          <div
            className="instruments grid  gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
          </div>
        </div>
      </div>
    </main>
  );
}
