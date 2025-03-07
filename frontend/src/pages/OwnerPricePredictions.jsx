// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// // Register the chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function OwnerPricePredictions() {
//     const userID = localStorage.getItem("userID");
//     const [calendarData, setCalendarData] = useState({});
//     const [selectedMonth, setSelectedMonth] = useState(0); // State for selected month (0 = January, 1 = February, etc.)
//     const [selectedYear, setSelectedYear] = useState(2024); // State for selected year
    
//     // Fetch the price history from the backend
//     const fetchPrices = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/priceHistory/${userID}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();
//             if (data.calender_dates && typeof data.calender_dates === "object") {
//                 setCalendarData(data.calender_dates);
//             } else {
//                 setCalendarData({});
//             }
//         } catch (error) {
//             console.error("Error fetching property data:", error);
//             alert("There was a problem fetching property data.");
//         }
//     };

//     useEffect(() => {
//         fetchPrices();
//     }, []);

//     // Function to prepare chart data for price and adjusted price, filtered by selected month and year
//     const prepareChartData = (propertyData) => {
//         const dates = [];
//         const prices = [];
//         const adjustedPrices = [];

//         // Filter the data by the selected month and year
//         propertyData.forEach((record) => {
//             const date = new Date(record.date);
//             if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth) { // Check if the year and month match
//                 dates.push(record.date);
//                 prices.push(record.price);
//                 adjustedPrices.push(record.adjusted_price);
//             }
//         });

//         return {
//             dates,
//             prices,
//             adjustedPrices
//         };
//     };

//     return (
//         <div className="flex flex-col items-center p-6 mt-4">
//             <div className="flex gap-10">
//             <h2 className="text-3xl font-bold mb-6">Price Predictions</h2>
//             {/* Year and Month Selectors */}
//             <div className="mb-6 flex items-center">
//                 <label htmlFor="year" className="text-lg font-medium">Select Year: </label>
//                 <select
//                     id="year"
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(Number(e.target.value))}
//                     className="ml-4 p-2 border rounded"
//                 >
//                     {/* Add the years to the dropdown */}
//                     <option value={2023}>2023</option>
//                     <option value={2024}>2024</option>
//                     <option value={2025}>2025</option>
//                     <option value={2026}>2026</option>
//                 </select>

//                 <label htmlFor="month" className="ml-4 text-lg font-medium">Select Month: </label>
//                 <select
//                     id="month"
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(Number(e.target.value))}
//                     className="ml-4 p-2 border rounded"
//                 >
//                     <option value={0}>January</option>
//                     <option value={1}>February</option>
//                     <option value={2}>March</option>
//                     <option value={3}>April</option>
//                     <option value={4}>May</option>
//                     <option value={5}>June</option>
//                     <option value={6}>July</option>
//                     <option value={7}>August</option>
//                     <option value={8}>September</option>
//                     <option value={9}>October</option>
//                     <option value={10}>November</option>
//                     <option value={11}>December</option>
//                 </select>
//             </div>
//             </div>
//             {/* Render line charts for each property */}
//             {Object.keys(calendarData).map((propertyID) => {
//                 const propertyData = calendarData[propertyID];
//                 const { dates, prices, adjustedPrices } = prepareChartData(propertyData);

//                 // If no data for the selected year and month, skip this property
//                 if (dates.length === 0) {
//                     return null;
//                 }

//                 // Data for the Price chart
//                 const priceData = {
//                     labels: dates,
//                     datasets: [
//                         {
//                             label: "Price",
//                             data: prices,
//                             fill: false,
//                             borderColor: "rgba(75, 192, 192, 1)",
//                             tension: 0.1
//                         }
//                     ]
//                 };

//                 return (
//                     <div key={propertyID} className="mb-8 w-full max-w-screen max-h-screen">
//                         {/* Price Chart */}
//                         <div className="mb-10 pt-6 pb-10 p-10 w-[1210px] h-[620px] border bg-gray-100 border-gray-300 rounded-lg shadow-lg">
//                             <h3 className="text-xl font-semibold text-gray-600">Property ID: {propertyID} : Price Variation</h3>
                            
//                             <Line data={priceData} options={{ responsive: true }} />
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default OwnerPricePredictions;


import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function OwnerPricePredictions() {
    const userID = localStorage.getItem("userID");
    const [calendarData, setCalendarData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(0); 
    const [selectedYear, setSelectedYear] = useState(2024);
    const [showFullYear, setShowFullYear] = useState(false); // New state for showing full-year data

    // Fetch the price history from the backend
    const fetchPrices = async () => {
        try {
            const response = await fetch(`http://localhost:5000/priceHistory/${userID}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.calender_dates && typeof data.calender_dates === "object") {
                setCalendarData(data.calender_dates);
                console.log("calender dates",data.calender_dates)
            } else {
                setCalendarData({});
            }
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data.");
        }
    };

    useEffect(() => {
        fetchPrices();
        // Call the function
        // analyzeReview(reviewScores);
    }, []);

    // Function to prepare chart data for price and adjusted price, filtered by selected month and year
    const prepareChartData = (propertyData) => {
        const dates = [];
        const prices = [];

        propertyData.forEach((record) => {
            const date = new Date(record.date);
            if (date.getFullYear() === selectedYear && (showFullYear || date.getMonth() === selectedMonth)) {
                dates.push(record.date);
                prices.push(record.price);
            }
        });

        return { dates, prices };
    };
    

    // const analyzeReview = async (reviewData) => {
    //     try {
            
    //         const response = await fetch(`http://localhost:5000/analyze_review`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 },
    //             body: JSON.stringify(reviewData)
    //         });

            
    
    //         const data = await response.json();
    //         console.log("Analysis Result:", data);
    
    //         alert(`Current Review Score: ${data.current_review_score}
    //         Focus on improving: ${data.suggested_improvements.join(", ")}`);
    
    //     } catch (error) {
    //         console.error("Error analyzing review:", error);
    //     }
    // };
    // const analyzeReview = async (reviewData) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/analyze_review`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //             },
    //             body: JSON.stringify(reviewData),
    //         });
    //         alert("Analyzing review...");
    
    //         // Check if response is OK
    //         if (!response.ok) {
    //             const errorText = await response.text();
    //             throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
    //         }
    
    //         const data = await response.json();
    //         console.log("Analysis Result:", data);
    
    //         alert(`Current Review Score: ${data.current_review_score}
    //         Focus on improving: ${data.suggested_improvements.join(", ")}`);
    
    //     } catch (error) {
    //         console.error("Error analyzing review:", error);
    //         alert("An error occurred while analyzing the review. Check the console for details.");
    //     }
    // };
    

    // const reviewScores = {
    //     review_scores_accuracy: 3.5,
    //     review_scores_cleanliness: 4.1,
    //     review_scores_checkin: 2.5,
    //     review_scores_communication: 3.4,
    //     review_scores_location: 2.9,
    //     review_scores_value: 2.5
    // };

    return (
        <div className="flex flex-col items-center p-6 mt-4">
            <div className="flex gap-10">
                <h2 className="text-3xl font-bold mb-6">Price Predictions</h2>
                {/* Year and Month Selectors */}
                <div className="mb-6 flex items-center">
                    <label htmlFor="year" className="text-lg font-medium">Select Year: </label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="ml-4 p-2 border rounded"
                    >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                    </select>

                    <label htmlFor="month" className="ml-4 text-lg font-medium">Select Month: </label>
                    <select
                        id="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="ml-4 p-2 border rounded"
                        disabled={showFullYear} // Disable month selection when viewing full year
                    >
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>
                    </select>

                    {/* Full Year Toggle */}
                    <div className="ml-6 flex items-center">
                        <input
                            type="checkbox"
                            id="fullYear"
                            checked={showFullYear}
                            onChange={() => setShowFullYear(!showFullYear)}
                            className="mr-2"
                        />
                        <label htmlFor="fullYear" className="text-lg font-medium">Show Full Year</label>
                    </div>
                </div>
            </div>

            {/* Render line charts for each property */}
            {Object.keys(calendarData).map((propertyID) => {
                const propertyData = calendarData[propertyID];
                const { dates, prices } = prepareChartData(propertyData);

                if (dates.length === 0) {
                    return null;
                }

                const priceData = {
                    labels: dates,
                    datasets: [
                        {
                            label: "Price",
                            data: prices,
                            fill: false,
                            borderColor: "rgba(75, 192, 192, 1)",
                            tension: 0.1
                        }
                    ]
                };

                return (
                    <div key={propertyID} className="mb-8 w-full max-w-screen max-h-screen">
                        <div className="mb-10 pt-6 pb-10 p-10 w-[1210px] h-[620px] border bg-gray-100 border-gray-300 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-600">Property ID: {propertyID} : Price Variation</h3>
                            <Line data={priceData} options={{ responsive: true }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default OwnerPricePredictions;
