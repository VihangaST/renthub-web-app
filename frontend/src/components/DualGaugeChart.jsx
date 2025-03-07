import React from "react";

const DualGaugeChart = ({ beforeRating, afterRating }) => {
  // Ensure both beforeRating and afterRating are numbers
  const safeBeforeRating = beforeRating ? parseFloat(beforeRating) : 0;
  const safeAfterRating = afterRating ? parseFloat(afterRating) : 0;
  
  const change = ((safeAfterRating - safeBeforeRating) / safeBeforeRating) * 100; // % Change
  
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold text-center text-gray-500 mb-4">
        Predicted Review Score Comparison
      </h2>
      <div className="flex justify-around items-center">
        {/* Before Rating */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">Before</h3>
          <p className="text-2xl text-gray-500 font-bold">
            {safeBeforeRating.toFixed(2)} ⭐
          </p>
        </div>

        {/* Change Indicator */}
        <div className="text-center">
          <p
            className={`text-lg font-bold ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
          </p>
        </div>

        {/* After Rating */}
        <div className="text-center">
          <h3 className="text-lg text-gray-500 font-medium">After</h3>
          <p className="text-2xl font-bold text-green-500">
            {safeAfterRating.toFixed(2)} ⭐
          </p>
        </div>
      </div>
    </div>
  );
};

export default DualGaugeChart;
