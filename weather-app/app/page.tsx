"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import FiveDayForecast from "./Components/FiveDayForecast";
import Mapbox from "./Components/Mapbox";
import Navbar from "./Components/Navbar";
import Temperature from "./Components/Temperature";
import { useGlobalContextUpdate } from "./Context/globalContext";
import defaultStates from "./utils/defaultStates";

// Lazy-loaded components using next/dynamic (with SSR disabled)
const AirPollution = dynamic(() => import("./Components/AirPollution"), { ssr: false });
const DailyForecast = dynamic(() => import("./Components/DailyForecast"), { ssr: false });
const FeelsLike = dynamic(() => import("./Components/FeelsLike"), { ssr: false });
const Humidity = dynamic(() => import("./Components/Humidity"), { ssr: false });
const Population = dynamic(() => import("./Components/Population"), { ssr: false });
const Sunset = dynamic(() => import("./Components/Sunset"), { ssr: false });
const UvIndex = dynamic(() => import("./Components/UvIndex"), { ssr: false });
const Wind = dynamic(() => import("./Components/Wind"), { ssr: false });
const Visibility = dynamic(() => import("./Components/Visibility"), { ssr: false });
const Pressure = dynamic(() => import("./Components/Pressure"), { ssr: false });

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
              <h2 className="flex items-center gap-2 font-medium">Top Large Cities:</h2>

              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none hover:bg-gray-400"
                    onClick={() => getClickedCityCoords(state.lat, state.lon)}
                  >
                    <p className="px-6 py-4">{state.name}</p>
                  </div>
                ))}
              </div>
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
          <a href="https://github.com/janysoth" target="_blank" className="text-green-300 font-bold">
            Jonny Vorn Soth
          </a>
        </p>
      </footer>
    </main>
  );
}