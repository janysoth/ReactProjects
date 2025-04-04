"use client";

import { Switch } from "@/components/ui/switch";
import { useGlobalContext } from "../Context/globalContext";

const UnitToggle = () => {
  const { unit, toggleUnit } = useGlobalContext();
  const isFahrenheit = unit === "F";

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm font-medium transition-all ${isFahrenheit ? "opacity-50" : "opacity-100"}`}>
        °C
      </span>
      <Switch checked={isFahrenheit} onCheckedChange={toggleUnit} />
      <span className={`text-sm font-medium transition-all ${isFahrenheit ? "opacity-100" : "opacity-50"}`}>
        °F
      </span>
    </div>
  );
};

export default UnitToggle;