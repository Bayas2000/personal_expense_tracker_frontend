import React from "react";
import { ResponsiveContainer } from "recharts";

// ChartConfig type - basic pass-through
export const ChartConfig = ({ children }) => <>{children}</>;

// ChartContainer - wraps the chart for consistent sizing/styling
export const ChartContainer = ({ children, config }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};

// ChartTooltip - wrapper for custom tooltip rendering
export const ChartTooltip = ({ cursor, content }) => {
  return (
    <recharts.Tooltip
      cursor={cursor || false}
      content={content}
    />
  );
};

// ChartTooltipContent - tooltip content component
export const ChartTooltipContent = ({ active, payload, label, indicator }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md text-sm border">
        <p className="font-medium">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 mt-1">
            <div
              className={`w-3 h-3 rounded-full ${
                indicator === "dashed" ? "border border-gray-500" : ""
              }`}
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>: <strong>{entry.value}</strong>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
