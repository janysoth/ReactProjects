"use client"

import React, { useEffect, useState } from "react"

import { commandIcon } from "@/app/utils/Icons"
import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "../Context/globalContext"
import { useCurrentLocation } from "../utils/misc"

const SearchBar = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext()
  const { setActiveCityCoords } = useGlobalContextUpdate()

  const [hoveredIndex, setHoveredIndex] = useState<number>(0)
  const [open, setOpen] = useState(false)

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon])
    setOpen(false)
  }

  const useMyLocation = useCurrentLocation(getClickedCoords)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.userAgent.toUpperCase().includes("MAC")
      const isCmdF = isMac
        ? e.metaKey && e.key === "f"
        : e.ctrlKey && e.key === "f"

      if (isCmdF) {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="search-btn">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-between w-full max-w-[400px] text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 transition ease-in-out duration-200"
          >
            <span className="text-muted-foreground">Search Here...</span>
            <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] px-[6px] rounded-sm flex items-center gap-1">
              {commandIcon}
              <span className="text-[10px] font-medium">F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a city name..."
            />
            <ul className="px-3 pb-2">
              {/* Use current location */}
              <li
                onClick={useMyLocation}
                className="py-3 px-2 text-sm rounded-sm cursor-pointer hover:bg-accent"
              >
                📍 Use Current Location
              </li>
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {/* No results */}
              {(geoCodedList?.length === 0 || !geoCodedList) && (
                <p className="px-2 py-3 text-sm text-muted-foreground">
                  No results found.
                </p>
              )}

              {/* Render geocoded suggestions */}
              {geoCodedList?.map(
                (
                  item: {
                    name: string
                    country: string
                    state: string
                    lat: number
                    lon: number
                  },
                  index: number
                ) => {
                  const { country, state, name } = item
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onClick={() => getClickedCoords(item.lat, item.lon)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-pointer transition-colors ${hoveredIndex === index ? "bg-accent" : ""
                        }`}
                    >
                      <p>
                        {name}, {state}, {country}
                      </p>
                    </li>
                  )
                }
              )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchBar