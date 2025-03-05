import React, { useEffect, useState } from "react";
import PropertyAvailabilityCalendar from "../components/Calender";

function OwnerBookingsPage() {
    const userID = localStorage.getItem("userID");

    const [bookedDates, setBookedDates] = useState({});
    const [selectedTenants, setSelectedTenants] = useState({}); // Track tenants per property
    const [selectedBookings, setSelectedBookings] = useState({}); // Store bookings per property


    const fetchCalenderDates = async () => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${userID}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.calender_dates && typeof data.calender_dates === "object") {
                setBookedDates(data.calender_dates);
                console.log("bookedDates",bookedDates)
                // Initialize selectedBookings with all bookings for each property
                setSelectedBookings(data.calender_dates);
            } else {
                setBookedDates({});
            }
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data.");
        }
    };

    useEffect(() => {
        fetchCalenderDates();
    }, []);

    const fetchTenantDetails = async (tenantId, propertyId) => {
        try {
            const response = await fetch(`http://localhost:5000/tenant/${tenantId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const tenantData = await response.json();
            setSelectedTenants((prev) => ({
                ...prev,
                [propertyId]: tenantData, // Store tenant details for the specific property
            }));
        } catch (error) {
            console.error("Error fetching tenant details:", error);
            alert("Error fetching tenant details.");
        }
    };

    const handleEventClick = (event, propertyId) => {
        const match = event.title.match(/Tenant (\d+)/);
        if (match) {
            const tenantId = parseInt(match[1], 10);
            fetchTenantDetails(tenantId, propertyId);
        }

        // // Store selected bookings for the property
        // setSelectedBookings((prev) => ({
        //     ...prev,
        //     [propertyId]: bookedDates[propertyId] || [],
        // }));
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold mb-6">Bookings</h2>

            {Object.entries(bookedDates || {}).map(([propertyId, events]) => (
                <div key={propertyId} className="min-w-[1200px] bg-gray-100 rounded-lg shadow-lg p-3 mb-3">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Property {propertyId}</h2>

                    {/* Two-column layout */}
                    <div className="flex gap-6 mx-auto min-w-[1200px]">
                        {/* Left Side - Calendar */}
                        <div className="w-2/3 p-4 border rounded-lg bg-white shadow-md">
                            <PropertyAvailabilityCalendar
                                events={(events || []).map(entry => ({
                                    title: entry.tenant_id ? `Booked \nTenant ${entry.tenant_id}` : "Booked",
                                    start: new Date(entry.date + "T00:00:00"),
                                    end: new Date(entry.date + "T23:59:59"),
                                    allDay: true
                                }))}
                                onEventClick={(event) => handleEventClick(event, propertyId)} // Pass propertyId
                            />
                        </div>

                        {/* Right Side - Booking Details */}
                        <div className="w-1/3 p-6 border rounded-lg bg-white shadow-md">
                            <div className="h-1/3 border rounded-lg bg-gray-100">
                            <h3 className="text-lg font-semibold mt-4 mb-3 text-gray-500">Booking Details</h3>

                                {/* Display selected tenant details */}
                                {selectedTenants[propertyId] ? (
                                    <div className="text-gray-700 mb-7">
                                        <p><strong>Name:</strong> {selectedTenants[propertyId].name}</p>
                                        <p><strong>Email:</strong> {selectedTenants[propertyId].email}</p>
                                        <p><strong>Phone:</strong> {selectedTenants[propertyId].tel}</p>
                                        <p><strong>Hometown:</strong> {selectedTenants[propertyId].hometown}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mb-4">Click on a booking to view details.</p>
                                )}

                            </div>
                            {/* List of all bookings for the property */}
                            <h3 className="text-lg font-semibold mb-2 mt-6 text-gray-500">All Bookings</h3>
                            <div className="max-h-60 overflow-y-auto border rounded-md shadow-sm">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-700">
                                            <th className="p-2 border">Date</th>
                                            <th className="p-2 border">Tenant ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(selectedBookings[propertyId] || []).map((booking, index) => (
                                            <tr key={index} className="odd:bg-white even:bg-gray-100 text-gray-500">
                                                <td className="p-2 border text-center">{booking.date}</td>
                                                <td className="p-2 border text-center">Tenant {booking.tenant_id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OwnerBookingsPage;
