import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  changePercentage: number;
  changeText: string;
  icon: React.ReactNode;
  iconBgColor?: string; // Optional prop for icon background color
  className?: string;   // ✅ Added className prop here
}

export default function StatsCard({
  title,
  value,
  changePercentage,
  changeText,
  icon,
  iconBgColor = "bg-gradient-to-br from-blue-500 to-blue-700", // Default gradient
  className = ""      // Default empty string for className
}: StatsCardProps) {
  const isPositive = changePercentage >= 0;

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-5 border border-neutral-200 hover:shadow-lg transition duration-300 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">{value}</p>
          <div
            className={`mt-2 flex items-center text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {Math.abs(changePercentage)}% {changeText}
          </div>
        </div>
        <div className={`${iconBgColor} text-white p-3 rounded-xl shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
