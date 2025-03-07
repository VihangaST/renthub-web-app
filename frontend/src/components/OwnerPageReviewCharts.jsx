import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerPageReviewCharts = ({ property }) => {
// Extract labels and values from the property array
const labels = property.map((score) => score.name); // Extract names for the labels
const dataValues = property.map((score) => score.value); // Extract values for the data

const data = {
  labels,
  datasets: [
    {
      label: "Review Scores",
      data: dataValues, // Use the values extracted above
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
export default OwnerPageReviewCharts;
