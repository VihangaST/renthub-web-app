import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeatureImportanceChart = ({ featureImportance,reviewData }) => {
  console.log(reviewData)
  if (!featureImportance || featureImportance.length === 0) {
    return <p className="text-gray-500">Loading chart...</p>; // Prevents rendering an empty chart
  }

  console.log("Feature Importance Data:", featureImportance, reviewData); // Debugging
  alert("Feature Importance Data:", featureImportance, reviewData)

  // Convert array of arrays into an array of objects
  const formattedData = featureImportance.map(([feature, importance]) => ({
    feature,
    importance,
  }));

  // Normalize values to sum to 100% for percentage representation
  const totalImportance = formattedData.reduce((sum, item) => sum + item.importance, 0);
  const normalizedData = formattedData.map((item) => ({
    feature: item.feature,
    // importance: ((item.importance / totalImportance) * 100).toFixed(2), // Convert to percentage with 2 decimal places
    importance:item.importance.toFixed(2),
  }));

  const data = {
    labels: normalizedData.map((item) => item.feature),
    datasets: [
      {
        label: "Review Rates",
        data: normalizedData.map((item) => item.importance),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
  
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}`, // Show percentage in tooltip
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Show percentage on Y-axis
        },
      },
    },
  };

  return (
    <div className="w-full h-80 p-4 bg-white rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeatureImportanceChart;
