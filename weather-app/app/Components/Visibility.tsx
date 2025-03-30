"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useGlobalContext } from "../Context/globalContext";
import { eye } from "../utils/Icons";

const Visibility = () => {
  const { forecast } = useGlobalContext();

  if (!forecast?.visibility)
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full skeleton-animate" />
    );

  const visibilityInKm = Math.round(forecast.visibility / 1000);

  const getVisibilityDescription = (visibilityInKm: number) => {
    if (visibilityInKm > 10) return "Excellent: Clear and vast view.";
    if (visibilityInKm > 5) return "Good: Easily navigable.";
    if (visibilityInKm > 2) return "Moderate: Some obstructions.";
    return "Poor: Limited visibility.";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>

        <p className="pt-4 text-2xl">{visibilityInKm} km</p>
      </div>

      <p className="text-sm">{getVisibilityDescription(visibilityInKm)}</p>
    </div>
  );
};

export default Visibility;