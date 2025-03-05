import React, { useEffect, useState } from "react";
import PropertyAvailabilityCalendar from "../components/Calender";

function OwnerPricePredictions() {
    const userID = localStorage.getItem("userID");

    // const fetchCalenderDates = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/bookings/${userID}`);
    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    //         const data = await response.json();
    //         if (data.calender_dates && typeof data.calender_dates === "object") {
    //             setBookedDates(data.calender_dates);
    //             console.log("bookedDates",bookedDates)
    //             // Initialize selectedBookings with all bookings for each property
    //             setSelectedBookings(data.calender_dates);
    //         } else {
    //             setBookedDates({});
    //         }
    //     } catch (error) {
    //         console.error("Error fetching property data:", error);
    //         alert("There was a problem fetching property data.");
    //     }
    // };

    // useEffect(() => {
    //     fetchCalenderDates();
    // }, []);

    // const fetchTenantDetails = async (tenantId, propertyId) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/tenant/${tenantId}`);
    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    //         const tenantData = await response.json();
    //         setSelectedTenants((prev) => ({
    //             ...prev,
    //             [propertyId]: tenantData, // Store tenant details for the specific property
    //         }));
    //     } catch (error) {
    //         console.error("Error fetching tenant details:", error);
    //         alert("Error fetching tenant details.");
    //     }
    // };

    // const handleEventClick = (event, propertyId) => {
    //     const match = event.title.match(/Tenant (\d+)/);
    //     if (match) {
    //         const tenantId = parseInt(match[1], 10);
    //         fetchTenantDetails(tenantId, propertyId);
    //     }

        // // Store selected bookings for the property
        // setSelectedBookings((prev) => ({
        //     ...prev,
        //     [propertyId]: bookedDates[propertyId] || [],
        // }));
    // };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold mb-6">Price Predictions</h2>

        </div>
    );
}

export default OwnerPricePredictions;
