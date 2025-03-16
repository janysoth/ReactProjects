"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 transition-all ${isDarkMode ? "opacity-50" : "opacity-100"}`} />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className={`h-5 w-5 transition-all ${isDarkMode ? "opacity-100" : "opacity-50"}`} />
    </div>
  );
};

export default ThemeToggle;