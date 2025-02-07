// import React from 'react';


// const StatusCard = ({ date, percentage, text,propertyID,fetchCalenderDates,calenderDates }) => {

//     const handleBooking = async () => {
//         try {
//             alert("Booking button clicked");
            
//             const userID = localStorage.getItem('userID');  // Retrieve userID from localStorage
//             if (!userID) {
//             alert("User ID not found in localStorage.");
//             return;
//             }

//             // API call to the backend
//             const response = await fetch('http://localhost:5000/book', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ date, userID ,propertyID}),
//             });

//             const data = await response.json();
//             if (response.ok) {
//             alert(`Booking successful: ${data.message}`);
//             fetchCalenderDates();

//             } else {
//             alert(`Booking failed: ${data.message}`);
//             }
//     } catch (error) {
//         console.error("Error during booking:", error);
//         alert("An error occurred while booking. Please try again later.");
//     }
//     };

//     return (
//     <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-lg mx-auto flex items-center gap-4">
        
//         {/* Date */}
//         <div className="text-gray-600 text-sm font-medium min-w-[80px]">{date}</div>
        
//         {/* Status Bar */}
//         <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
//             <div
//             className="h-full bg-blue-500 rounded-full"
//             style={{ width: `${percentage}%` }}
//             ></div>
//         </div>

//         {/* Percentage */}
//         <div className="text-sm font-medium text-gray-700 w-12 text-center">
//             {percentage}%
//         </div>

//         {/* Text */}
//         <div className="flex items-center justify-center w-40 h-8 bg-blue-500 text-white font-bold text-center">
//         {/* <div className="text-gray-800 font-semibold min-w-[120px]"> */}
//             {text}
//         </div>

//         <div className="flex flex-col items-center justify-center w-20 h-8 bg-blue-500 text-white font-bold text-center space-y-1">
//             <button className="bg-white text-blue-500 text-xs font-semibold py-1 px-2 rounded"
//             onClick={handleBooking}>
//                 Book
//             </button>
//     </div>
//     </div>
// );
// };

// export default StatusCard;


import React from 'react';

const StatusCard = ({ date, percentage, text, propertyID, fetchCalenderDates, calenderDates }) => {

    const handleBooking = async () => {
        try {
            const userID = localStorage.getItem('userID');  // Retrieve userID from localStorage
            if (!userID) {
                alert("User ID not found in localStorage.");
                return;
            }

            // API call to the backend
            const response = await fetch('http://localhost:5000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, userID, propertyID }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Booking successful: ${data.message}`);
                fetchCalenderDates(); // Refresh calendar dates after booking
            } else {
                alert(`Booking failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Error during booking:", error);
            alert("An error occurred while booking. Please try again later.");
        }
    };

    // Check if the date is already booked
    const isBooked = calenderDates.some(
        (bookedDate) => new Date(bookedDate.start).toDateString() === new Date(date).toDateString()
    );

    return (
        <div className="bg-gray-100 rounded-lg p-2 w-full mx-auto flex items-center gap-20">
            
            {/* Date */}
            <div className="text-gray-600 text-sm font-medium min-w-[150px]">{date}</div>
            
            {/* Booking Button */}
                {isBooked ? (
                    <div>
                        <div className="flex flex-col items-center justify-center w-20 h-8 text-white font-bold text-center space-y-1">
                            <button
                                className="bg-gray-700 text-white text-xs font-semibold py-1 px-2 rounded cursor-not-allowed"
                                disabled
                            >
                                Booked
                            </button>
                        </div>
                    </div>
                ) : (

                    <div className='bg-white rounded-lg p-1 w-full mx-auto flex items-center gap-10'>
                        {/* Status Bar */}
                        <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gray-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>

                        {/* Percentage */}
                        <div className="text-sm font-medium text-gray-700 w-12 text-center">
                            {percentage}%
                        </div>

                        {/* Text */}
                        <div className="flex items-center justify-center w-40 h-8 bg-gray-500 text-white font-bold text-center">
                            {text}
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-20 h-8 text-white font-bold text-center space-y-1">
                            <button
                                className="bg-gray-700 text-xs font-bold py-1 px-2 rounded"
                                onClick={handleBooking}
                            >
                                Book
                            </button>
                        </div>
                        
                        </div>
                )}
            </div>
        // </div>
    );
};

export default StatusCard;

