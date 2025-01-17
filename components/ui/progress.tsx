"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    segments?: number;
  }
>(({ className, value = 0, segments = 20, ...props }, ref) => {
  const segmentArray = Array.from({ length: segments }, (_, i) => {
    const segmentValue = (i + 1) * (100 / segments);
    return value >= segmentValue;
  });

  return (
    <div ref={ref} className={cn("flex gap-px", className)} {...props}>
      {segmentArray.map((isActive, i) => (
        <div
          key={i}
          className={cn(
            "h-2 w-0.5 transition-colors duration-200",
            isActive ? "bg-green-500" : "bg-green-900/40",
          )}
        />
      ))}
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
