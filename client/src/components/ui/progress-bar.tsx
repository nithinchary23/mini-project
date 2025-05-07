import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  colorByValue?: boolean;
  invertColor?: boolean;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  colorByValue = false,
  invertColor = false,
  showLabel = false,
  className,
}: ProgressBarProps) {
  // Ensure value is between 0 and max
  const safeValue = Math.max(0, Math.min(value, max));
  const percentage = (safeValue / max) * 100;
  
  let colorClass = "bg-primary";
  
  if (colorByValue) {
    if (invertColor) {
      // For metrics where lower is better (e.g. infection risk)
      if (percentage <= 20) colorClass = "bg-success";
      else if (percentage <= 40) colorClass = "bg-success";
      else if (percentage <= 60) colorClass = "bg-warning";
      else if (percentage <= 80) colorClass = "bg-warning";
      else colorClass = "bg-error";
    } else {
      // For metrics where higher is better (e.g. compatibility)
      if (percentage >= 80) colorClass = "bg-success";
      else if (percentage >= 60) colorClass = "bg-success";
      else if (percentage >= 40) colorClass = "bg-warning";
      else if (percentage >= 20) colorClass = "bg-warning";
      else colorClass = "bg-error";
    }
  }
  
  return (
    <div className="flex items-center">
      <div className={cn("w-full bg-neutral-200 rounded-full h-2.5", className)}>
        <div 
          className={`${colorClass} h-2.5 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showLabel && (
        <span className="ml-2 text-sm text-neutral-900">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
