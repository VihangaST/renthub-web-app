import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function OwnerPricePredictions() {
    const userID = localStorage.getItem("userID");
    // States for price history (individual control per property)
    const [calendarData, setCalendarData] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    // States for price predictions (individual control per property)
    const [predictions, setPredictions] = useState({});
    const [loading, setLoading] = useState(true);
    const [predictionFilters, setPredictionFilters] = useState({});

    useEffect(() => {
        fetchPrices();
    }, []);

    // Fetch price history based on userID and selected filters
    const fetchPrices = async () => {
        try {
            const response = await fetch(`http://localhost:5000/priceHistory/${userID}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();

            if (data.calender_dates && typeof data.calender_dates === "object") {
                setCalendarData(data.calender_dates);
            } else {
                setCalendarData({});
            }
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data.");
        }
    };

    // Fetch predictions based on user selection
    const fetchPredictions = async (propertyID) => {

        if (!predictionFilters[propertyID]) return;

        const { predictionSelectedYear, predictionSelectedMonth } = predictionFilters[propertyID];
        try {
            const response = await fetch(`http://127.0.0.1:5000/predict/${propertyID}?year=${predictionSelectedYear}&month=${predictionSelectedMonth}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log("Predictions Data:", data);

            setPredictions((prev) => ({
                ...prev,
                [propertyID]: data || {},
            }));
            
        } catch (error) {
            console.error("Error fetching predictions:", error);
        } finally {
            setLoading(false);
        }
    };

    const prepareChartData = (propertyData, propertyID) => {
        if (!selectedFilters[propertyID]) return { dates: [], prices: [] };
    
        const { selectedYear, selectedMonth, showFullYear } = selectedFilters[propertyID];
    
        if (!propertyData || propertyData.length === 0) {
            console.warn(`No price history found for property ID: ${propertyID}`);
            return {
                dates: ["No Data"],
                prices: [0], // Placeholder value for an empty chart
            };
        }
    
        const dates = [];
        const prices = [];
    
        propertyData.forEach((record) => {
            const date = new Date(record.date);
            if (date.getFullYear() === selectedYear && (showFullYear || date.getMonth() === selectedMonth)) {
                dates.push(record.date);
                prices.push(record.price);
            }
        });
    
        return dates.length > 0 ? { dates, prices } : { dates: ["No Data"], prices: [0] };
    };

    const preparePredictionChartData = (propertyID) => {
        console.log('predictions',predictions)
        if (!predictions[propertyID] || !predictions[propertyID].predictions) {
            console.warn(`No prediction data found for property ID: ${propertyID}`);
            return { dates: [], predictedPrices: [] };
        }
        const filteredData = predictions[propertyID].predictions || [];// Access the array

            console.log('filteredData from preparePredictionChartData',filteredData)
            console.log('dates from preparePredictionChartData',filteredData.map((p) => p.date))
            console.log('predicted prices from preparePredictionChartData',filteredData.map((p) => p.predicted_price))
            return {
                dates: filteredData.map((p) => p.date || "Unknown Date"),
                predictedPrices: filteredData.map((p) => p.predicted_price || 0),
            };
        };
    
    return (
        <div className="flex flex-wrap gap-10 p-6 mt-2">
            {Object.keys(calendarData).map((propertyID) => {
                const propertyData = calendarData[propertyID];

                // Ensure filters exist for this property
                if (!selectedFilters[propertyID]) {
                    setSelectedFilters((prev) => ({
                        ...prev,
                        [propertyID]: { selectedYear: 2024, selectedMonth: 0, showFullYear: false },
                    }));
                }

                if (!predictionFilters[propertyID]) {
                    setPredictionFilters((prev) => ({
                        ...prev,
                        [propertyID]: { predictionSelectedYear: 2024, predictionSelectedMonth: 0 },
                    }));
                }

                const { dates, prices } = prepareChartData(propertyData, propertyID);
                const { dates: predictionDates, predictedPrices } = preparePredictionChartData(propertyID);
                console.log('predictionDates',predictionDates)
                console.log('predictedPrices',predictedPrices)

                return (
                <>
                <h2 className="text-3xl font-bold">Price Predictions {propertyID} </h2> 
                    <div key={propertyID} className="flex w-full gap-10 bg-gray-100 p-6 rounded shadow-md">
                    <div className="w-full bg-white mt-5 p-4 rounded">
                    <h2 className="text-lg font-bold text-black">Price History</h2>
                        
                        <div className="mb-10 flex items-center bg-gray-100">
                            <label className="text-md font-medium text-gray-400">Select Year: </label>
                            <select
                                value={selectedFilters[propertyID]?.selectedYear}
                                onChange={(e) => {
                                    const selectedYear = Number(e.target.value);
                                    setSelectedFilters((prev) => ({
                                        ...prev,
                                        [propertyID]: {
                                            ...prev[propertyID],
                                            selectedYear,
                                            selectedMonth: selectedYear === 2023 ? 2 : 0, // Reset to the first available month for that year
                                        },
                                    }));
                                }}
                                className="ml-4 p-1 border rounded"
                            >
                                {[2023, 2024].map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>

                            <label className="ml-4 text-md font-medium text-gray-400">Select Month: </label>
                            <select
                                value={selectedFilters[propertyID]?.selectedMonth}
                                onChange={(e) =>
                                    setSelectedFilters((prev) => ({
                                        ...prev,
                                        [propertyID]: {
                                            ...prev[propertyID],
                                            selectedMonth: Number(e.target.value),
                                        },
                                    }))
                                }
                                className="ml-4 p-1 border rounded"
                                disabled={selectedFilters[propertyID]?.showFullYear}
                            >
                                {(
                                    selectedFilters[propertyID]?.selectedYear === 2023
                                        ? ["March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                        : ["January", "February", "March"]
                                ).map((month, index) => (
                                    <option key={index} value={index + (selectedFilters[propertyID]?.selectedYear === 2023 ? 2 : 0)}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <div className="ml-6 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[propertyID]?.showFullYear}
                                    onChange={() =>
                                        setSelectedFilters((prev) => ({
                                            ...prev,
                                            [propertyID]: {
                                                ...prev[propertyID],
                                                showFullYear: !prev[propertyID]?.showFullYear,
                                            },
                                        }))
                                    }
                                    className="mr-2"
                                />
                                <label className="text-md font-medium text-gray-400">Show Full Year</label>
                            </div>
                        </div>

                        {/* Price History Chart */}
                        {dates.length > 0 && (
                            <Line
                            data={{
                                labels: dates.length > 0 ? dates : ["No Data"], 
                                datasets: [
                                    {
                                        label: "Price",
                                        data: prices.length > 0 ? prices : [0], 
                                        borderColor: "rgba(75, 192, 192, 1)", 
                                        tension: 0.1
                                    }
                                ],
                            }}
                            options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true, // Ensures the Y-axis starts from 0
                                        min: 0, // Prevents negative values
                                        ticks: {
                                            callback: function (value) {
                                                return value >= 0 ? value : ''; // Only display positive values
                                            }
                                        }
                                    }
                                },
                                plugins: {
                                    legend: { display: true },
                                    tooltip: { enabled: dates.length > 0 } // Disable tooltip if there's no data
                                }
                            }}
                        />
                        )}
                    </div>
                    {/* Prediction Filters */}
                    <div className="w-full bg-white mt-5 p-4 rounded">
                    <h2 className="text-lg font-bold text-black">Price Predictions</h2>
                    <div className="mb-10 flex items-center bg-gray-100">
                        <label className="text-md font-medium text-gray-500">Prediction Year: </label>
                        <select
                            value={predictionFilters[propertyID]?.predictionSelectedYear || 2025}
                            onChange={(e) => {
                                const selectedYear = Number(e.target.value);
                                setPredictionFilters((prev) => ({
                                    ...prev,
                                    [propertyID]: {
                                        ...prev[propertyID],
                                        predictionSelectedYear: selectedYear,
                                        predictionSelectedMonth: selectedYear === 2025 ? 3 : 0, // Reset to the first available month
                                    },
                                }));
                            }}
                            className="ml-4 p-1 border rounded"
                        >
                            {[2025, 2026].map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <label className="ml-4 text-md font-medium text-gray-500">Prediction Month: </label>
                        <select
                            value={predictionFilters[propertyID]?.predictionSelectedMonth || (predictionFilters[propertyID]?.predictionSelectedYear === 2025 ? 3 : 0)}
                            onChange={(e) =>
                                setPredictionFilters((prev) => ({
                                    ...prev,
                                    [propertyID]: {
                                        ...prev[propertyID],
                                        predictionSelectedMonth: Number(e.target.value),
                                    },
                                }))
                            }
                            className="ml-4 p-1 border rounded"
                        >
                            {(
                                predictionFilters[propertyID]?.predictionSelectedYear === 2025
                                    ? ["April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                    : ["January", "February", "March"]
                            ).map((month, index) => (
                                <option key={index} value={index + (predictionFilters[propertyID]?.predictionSelectedYear === 2025 ? 3 : 0)}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => fetchPredictions(propertyID)}
                            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Predict
                        </button>
                    </div>

                {/* Prediction Chart */}
            {!loading && predictionDates.length > 0 && (
                <Line
                    data={{
                        labels: predictionDates,
                        datasets: [{ label: "Predicted Price", data: predictedPrices, borderColor: "rgb(75, 192, 192)", tension: 0.1 }],
                    }}
                    options={{ responsive: true }}
                />
            )}
            </div>
            </div>
            </>
        );
        })}
    </div>
    );
}

export default OwnerPricePredictions;
