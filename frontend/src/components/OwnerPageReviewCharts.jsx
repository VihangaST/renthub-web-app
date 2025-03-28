import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerPageReviewCharts = ({ property = [], featureImportance = [] }) => {
  // Ensure property is an array before mapping
  const labels = property.length > 0 ? property.map((score) => score.name) : [];
  const dataValues = property.length > 0 ? property.map((score) => score.value) : [];
  console.log("**********Property:", property,"featureImportance" ,featureImportance); // Debugging

  const formattedData = featureImportance.map(([feature, importance]) => ({
    feature,
    importance: Number(importance) || 0, // Ensure numeric values
  })).sort((a, b) => b.importance - a.importance); // Sort descending
  
  const data = {
    labels: formattedData.map((item) => item.feature), // Labels from feature importance
    datasets: [
      {
        label: "Feature Importance",
        data: formattedData.map((item) => item.importance.toFixed(2)), // Feature importance values
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Own Review Scores",
        data: dataValues, // Use extracted review scores
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
      {formattedData.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default OwnerPageReviewCharts;
