import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PropertyReviewChart = ({ property }) => {
  const labels = [
    "Accuracy",
    "Check-in",
    "Cleanliness",
    "Communication",
    "Location",
    // "Overall Rating",
    "Value",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Review Scores",
        data: [
          property.review_scores_accuracy,
          property.review_scores_checkin,
          property.review_scores_cleanliness,
          property.review_scores_communication,
          property.review_scores_location,
        //   property.review_scores_rating,
          property.review_scores_value,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Assuming max rating is 5
      },
    },
  };

  return (
    <div className="w-full h-80 p-4 bg-white rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PropertyReviewChart;
