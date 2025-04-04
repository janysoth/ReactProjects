import React, { useEffect, useState } from 'react'

import { commandIcon } from '@/app/utils/Icons'
import { Button } from '@/components/ui/button'
import { Command, CommandInput } from "@/components/ui/command"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useGlobalContext, useGlobalContextUpdate } from '../Context/globalContext'
import { useCurrentLocation } from '../utils/misc'

const SearchBar = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setOpen(false);
  };

  const useMyLocation = useCurrentLocation(getClickedCoords);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.toUpperCase().includes('MAC');

      const isCmdF = isMac ? e.metaKey && e.key === 'f' : e.ctrlKey && e.key === 'f';

      if (isCmdF) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className="search-btn">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className=" rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a command or search..."
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>


              {/* Use current location */}
              <li
                onClick={useMyLocation}
                className="py-3 px-2 text-sm rounded-sm cursor-pointer hover:bg-accent"
              >
                📍 Use Current Location
              </li>

              {geoCodedList?.length === 0 ||
                (!geoCodedList && <p>No Results</p>)}

              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm  rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className=" text">
                          {name}, {state}, {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchBar