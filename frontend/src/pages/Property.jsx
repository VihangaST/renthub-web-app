import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import StatusCard from '../components/StatusCard';
import PropertyReviewChart from '../components/Barchart';
import OverallRatingDoughnutChart from '../components/Doughnutchart';
import PropertyAvailabilityCalendar from '../components/Calender';
import ReviewCard from '../components/ReviewCard';
import OccupancyPredictionDisplay from '../components/OccupancyPredictionDisplay';

function Property() {
    const { propertyId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [calenderDates, setCalenderDates] = useState([]); //for calender displays
    const [bookedDates,setBookedDates]=useState([]); //store booked dates for occupancy prediction
    const [property, setProperty] = useState({
        list_ID:'',
        list_name:'',
        host_ID:'',
        host_name:'',
        neighbourhood:'',
        latitude:'',
        longitude:'',
        room_type:'',
        price:''
        
    });
    const [dates, setDates] = useState({ fromDate: "", endDate: "" });
    const [dateList, setDateList] = useState([]);
    
    const [occupancyPredictions, setOccupancyPredictions] = useState([]);

    const generateDateArray = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateList = [];
    
        // Ensure the dates are valid
        if (start && end && start <= end) {
        while (start <= end) {
        dateList.push(new Date(start).toISOString().split('T')[0]); // Format as YYYY-MM-DD
        start.setDate(start.getDate() + 1);
        }
        }
    
        return dateList;
    };
    
    const handleSubmit = () => {
    if (dates.fromDate && dates.endDate) {
        if(dates.fromDate > dates.endDate){
            alert("End Date should be greater than Start Date");
            return;
        }
        if(dates.fromDate < new Date().toISOString().split('T')[0]){
            alert("Start Date should be greater than or equal to today's date");
            return;
        }
        if(dates.endDate < new Date().toISOString().split('T')[0]){
            alert("End Date should be greater than or equal to today's date.")
        }
        
        const generatedDates = generateDateArray(dates.fromDate, dates.endDate);
        setDateList(generatedDates);
        console.log("Generated Dates:", generatedDates); 
        getOccupancyPrediction();
    }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDates((prevDates) => ({
        ...prevDates,
        [name]: value,
    }));
    };

    const fetchProperty = async () => {     
        try {
            // alert(propertyId)
            const response = await fetch(`http://localhost:5000/property/${propertyId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data);
            setProperty(data.property);
            return data; // optional, in case you want to use the fetched data
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data. Please try again later.");
            // Optional: log error to an external service or update the state to show an error message in the UI
        }
    };

    const [reviewList, setReviewList]=useState([])
    // Fetch Reviews from API
    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/property_reviews/${propertyId}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (!data.reviews) throw new Error('Property reviews data is missing in the response');

            const formattedData = Object.keys(data.reviews).map((propertyID) => {
                return {
                    propertyID,
                    reviews: data.reviews[propertyID]
                };
            });
            setReviewList(formattedData);

        } catch (error) {
            console.error("Error fetching property reviews:", error);
        }
    };

    // occupancy predictions
    async function getOccupancyPrediction() {
    try {
        const response = await fetch("http://localhost:5000/availability", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            list_ID: property.list_ID,
            dates: dateList,
        }),
        });
    
        if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
        }
    
        const predictions = await response.json();
        console.log("Predictions:", predictions);
        setOccupancyPredictions(predictions);
        return predictions; // Returns the predictions JSON array to be used in your frontend
    } catch (error) {
        console.error("Error fetching predictions:", error);
        return null;
    }
    }

    const fetchReviewRates = async () => {     
        try {
            // alert(propertyId)
            const response = await fetch(`http://localhost:5000/reviewrates/${propertyId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('review rates',data);
            setReviews(data.property);
            // alert(data);
            return data; // optional, in case you want to use the fetched data
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property review data. Please try again later.");
            // Optional: log error to an external service or update the state to show an error message in the UI
        }
    };

    const fetchCalenderDates = async()=>{
        try {
            // alert(propertyId)
            const response = await fetch(`http://localhost:5000/calenderdates/${propertyId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('calender dates',data);
            if (data.calender_dates) {
                // Convert the response data into the required event format
                const events = data.calender_dates.map((entry) => {
                    return {
                        title: "Booked",
                        start: new Date(entry.date + "T00:00:00"),  // Start at 9:00 AM
                        end: new Date(entry.date + "T24:00:00"),    // End at 5:00 PM
                        allDay: false // Specific time slot
                    };
                });
                console.log('Formatted events:', events);
                setCalenderDates(events);  // Assuming setCalenderDates is your state setter

                console.log('calender dates',data.calender_dates);
                setBookedDates(data.calender_dates);//for occupancy predictions table

                



    
            } else {
                setCalenderDates([]); // Set an empty array if no data is found
            }
        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property review data. Please try again later.");
            // Optional: log error to an external service or update the state to show an error message in the UI
        }
    }

    useEffect(() => {
        fetchProperty();
        fetchReviewRates();
        fetchCalenderDates();
        fetchReviews();

    }, []);    

  return (
    <>
    <div className="flex w-full h-full overflow-hidden">
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <main className="grow">
        <h2 className="text-3xl font-bold mt-10 mb-2">PROPERTY DETAILS</h2>

        {/* <div className="grid grid-cols-2 gap-6 "> */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 p-6">
            {/* Property Details Card */}
            <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 w-96 h-80 flex flex-col justify-center">
                <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{property.list_name}</h2>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Host:</span> {property.host_name}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Location:</span> {property.neighbourhood}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Coordinates:</span> {property.latitude}, {property.longitude}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Room Type:</span> {property.room_type}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Price per Night:</span> ${property.price}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Neighbourhood:</span> {property.neighbourhood}
                </p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="w-96 h-80 bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
                <PropertyReviewChart property={reviews} />
            </div>

            {/* Doughnut Chart */}
            <div className="w-80 h-80 bg-white shadow-lg rounded-lg p-4 flex items-center justify-center">
                {property ? <OverallRatingDoughnutChart property={reviews} /> : <p>Loading...</p>}
            </div>
    </div>

    <div className=" justify-center items-stretch gap-6 p-6">
        <div className="flex justify-center rounded-lg items-center min-h-screen bg-gray-100 p-6">
        <PropertyAvailabilityCalendar events={calenderDates} bookedDates={bookedDates} />
        </div>
    </div>

    <div className="p-6 bg-gray-50 shadow-md rounded-lg border border-gray-300 space-y-6 w-full">
      {/* First Row: Date Inputs & Button */}
    <div className="flex items-center justify-between space-x-4">
    <div className="flex items-center space-x-4">
        <label htmlFor="fromDate" className="text-sm font-medium text-gray-700">From Date</label>
        <input
        type="date"
        id="fromDate"
        name="fromDate"
        value={dates.fromDate}
        onChange={handleDateChange}
        className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md"
        />
        </div>

    <div className="flex items-center space-x-4">
        <label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</label>
        <input
        type="date"
        id="endDate"
        name="endDate"
        value={dates.endDate}
        onChange={handleDateChange}
        className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md"
        />
    </div>

    <button
        type="submit"
        className=" h-10 px-4 py-2 text-sm text-white font-semibold rounded-md bg-primary hover:bg-primary-dark focus:ring focus:ring-primary-dark"
        onClick={handleSubmit}
    >
        Check Availability
    </button>
    </div>

      {/* Second Row: Occupancy Predictions */}
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 h-80 overflow-y-auto">
    <div className="space-y-4">
        {/* {occupancyPredictions.length > 0 ? (
        occupancyPredictions.map((prediction, index) => (
            <StatusCard
            key={index}
            date={new Date(prediction.ds).toDateString()}
            percentage={(prediction.availability_chance * 100).toFixed(2)}
            text={prediction.availability_status}
            propertyID={propertyId}
            fetchCalenderDates={fetchCalenderDates}
            calenderDates={calenderDates}
            bookedDates={bookedDates}
            />
        ))
        ) : (
        <p className="text-center text-gray-500">No occupancy predictions available.</p>
        )} */}
        <OccupancyPredictionDisplay occupancyPredictions={occupancyPredictions} bookedDates={bookedDates} propertyID={propertyId} fetchCalenderDates={fetchCalenderDates}/>

    </div>
    </div>
</div>
<div className="p-6 bg-white mt-8 shadow-lg rounded-lg border border-gray-200 w-full h-80 overflow-y-auto">
            <h3 className="text-xl text-black font-semibold mb-4">Reviews</h3>
            {reviewList.length > 0 ? (
                reviewList.map((item, index) => (
                    <div key={index}>
                        {item.reviews.map((review, idx) => (
                            <ReviewCard key={idx} review={review} />
                        ))}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No reviews available.</p>
            )}
        </div>

</main>
</div>
    </div>
  </>
  
  )
}

export default Property

