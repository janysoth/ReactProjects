"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

const UvProgress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-3 rounded-full bg-primary shadow-lg shadow-white ring-2 dark:ring-gray-500 transition-all"
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));

UvProgress.displayName = ProgressPrimitive.Root.displayName;

export { UvProgress };
