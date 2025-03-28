import React from "react";

function OccupancyPredictionDisplay({ occupancyPredictions, bookedDates,propertyID,fetchCalenderDates }) {
    console.log("occupancyPredictions:", occupancyPredictions);
    console.log("bookedDates:", bookedDates);
    const userID = localStorage.getItem('userID'); // Retrieve userID from localStorage

    // Check if occupancyPredictions exists and has a valid predictions array
    if (!occupancyPredictions || !Array.isArray(occupancyPredictions.predictions) || occupancyPredictions.predictions.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-4">
                No predictions available.
            </div>
        );
    }

    const handleBooking = async (date, propertyID) => {
        try {
            if (!userID) {
                alert("User ID not found in localStorage.");
                return;
            }
    
            // Convert date to required format (e.g., "Wed Apr 09 2025")
            const formattedDate = new Date(date).toDateString();  
    
            // API call to the backend
            const response = await fetch('http://localhost:5000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: formattedDate, userID, propertyID }),  // ✅ Send formatted date
            });
    
            const data = await response.json();
            if (response.ok) {
                alert(`Booking successful: ${data.message}`);
                fetchCalenderDates();

            } else {
                alert(`Booking failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred while booking. Please try again later.");
        }
    };
    

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Availability Predictions</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-2 px-4 text-center">Date</th>
                            <th className="py-2 px-4 text-center">Probability</th>
                            <th className="py-2 px-4 text-center">Available</th>
                            <th className="py-2 px-4 text-center">Action</th> {/* New column for button */}
                        </tr>
                    </thead>
                    <tbody>
                        {occupancyPredictions.predictions.map((item, index) => {
                            // Check if the current date is already booked
                            const isBooked = bookedDates.some(booked => booked.date === item.date);

                            return (
                                <tr key={index} className="border-b text-black">
                                    <td className="py-2 px-4">{item.date}</td>
                                    <td className="py-2 px-4">
                                        {(item.probability * 100).toFixed(1)}%
                                    </td>
                                    <td className="py-2 px-4">
                                        {item.availability ? (
                                            <span className="text-green-600 font-medium">Yes</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">Low Probability</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">
                                        {isBooked ? (
                                            <button
                                                className="w-full bg-gray-500 text-white px-4 py-1 rounded cursor-not-allowed"
                                                disabled
                                            >
                                                Booked
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleBooking(item.date, propertyID)}  // ✅ Pass values
                                                className="w-full bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                                            >
                                                Book
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OccupancyPredictionDisplay;
