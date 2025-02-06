import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const OverallRatingDoughnutChart = ({ property }) => {
  // Ensure property exists before accessing review_scores_rating
  if (!property || property.review_scores_rating === undefined) {
    return <p>Loading...</p>; // Prevents errors
  }

  const overallRating = property.review_scores_rating;
  const remaining = 5 - overallRating; // Remaining value to reach 5

  const data = {
    labels: ["Overall Rating", "Remaining"],
    datasets: [
      {
        data: [overallRating, remaining > 0 ? remaining : 0], // Avoids negative values
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(200, 200, 200, 0.3)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(200, 200, 200, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="relative w-60 h-80 p-4 bg-white rounded-lg flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute text-xl font-bold text-gray-700">
        {overallRating?.toFixed(1)} / 5
      </div>
    </div>
  );
};

export default OverallRatingDoughnutChart;
