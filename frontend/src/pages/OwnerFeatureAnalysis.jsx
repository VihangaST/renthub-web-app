// // import React, { useEffect, useState } from "react";
// // import FeatureImportanceChart from "../components/FeatureImportanceChart";
// // import FeatureInsights from "../components/FeatureInsights";
// // import DualGaugeChart from "../components/DualGaugeChart";
// // import OwnerPageReviewCharts from "../components/OwnerPageReviewCharts";

// // function OwnerFeatureAnalysis() {
// //     const userID = localStorage.getItem("userID");
// //     const [reviewData, setReviewData] = useState([]);

// //     const fetchReviews = async () => {
// //         try {
// //             const response = await fetch(`http://localhost:5000/review_rates/${userID}`);
// //             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
// //             const data = await response.json();
            
// //             // Check if calender_dates exists in the response data
// //             if (!data.calender_dates) {
// //                 throw new Error('Property data is missing from the response');
// //             }
    
// //             // Extract and format the review scores for each property
// //     const formattedData = Object.keys(data.calender_dates).map((propertyID) => {
// //         const reviewScores = data.calender_dates[propertyID][0]; // Assuming the first object contains review data
// //         const scores = [
// //             { name: "Accuracy", value: reviewScores.review_scores_accuracy },
// //             { name: "Check-in", value: reviewScores.review_scores_checkin },
// //             { name: "Cleanliness", value: reviewScores.review_scores_cleanliness },
// //             { name: "Communication", value: reviewScores.review_scores_communication },
// //             { name: "Location", value: reviewScores.review_scores_location },
// //             // { name: "Rating", value: reviewScores.review_scores_rating },
// //             { name: "Value", value: reviewScores.review_scores_value },
// //         ];
// //         console.log("Review Scores:", scores);

// //         // Log the data for verification
// //         console.log(`Property ID: ${propertyID}`, scores);

// //         return {
// //             propertyID,
// //             reviewScores: scores
// //         };
// //             });
    
// //             setReviewData(formattedData); // Store all properties data
    
// //         } catch (error) {
// //             console.error("Error fetching property data:", error);
// //             alert("There was a problem fetching property data.");
// //         }
// //     };
        
// //     useEffect(() => {
// //         // fetch review rates of all properties
// //         fetchReviews(); 

// //     }, []);

// //     const [features, setFeatures] = useState({
// //         review_scores_accuracy: "4.6",
// //         review_scores_cleanliness: "4.8",
// //         review_scores_checkin: "3.8",
// //         review_scores_communication: "4.1",
// //         review_scores_location: "3.6",
// //         review_scores_value: "3.8",
// //       });

// //     const [predictedRating, setPredictedRating] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [featureImportance, setFeatureImportance] = useState([]);

// //     // Handle input change
// //     const handleChange = (e) => {
// //         setFeatures({ ...features, [e.target.name]: e.target.value });
// //     };

// //     // Submit form data to Flask API
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError(null);
// //         setPredictedRating(null);

// //         try {
// //         const response = await fetch(`http://localhost:5000/analyze_review`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" ,
// //                 Accept: "application/json",
// //             },
// //             body: JSON.stringify({
// //             features: Object.values(features).map(Number), // Convert values to numbers
// //             }),
// //         });

// //         const data = await response.json();
// //         if (data.error) {
// //             setError(data.error);
// //         } else {
// //             setPredictedRating(data.predicted_rating.toFixed(2));
// //             setFeatureImportance(
// //             Object.entries(data.feature_importance)
// //                 .sort((a, b) => b[1] - a[1]) // Sort features by importance
// //             );
// //         }
// //         } catch (err) {
// //         setError("Error connecting to the server.");
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col items-center p-6 mt-4">
// //             <div className="flex gap-10">
// //                 <h2 className="text-3xl font-bold mb-6">Reviews</h2>
// //             </div>
// //             <div className="flex p-6 max-w-full mx-auto bg-white rounded shadow">
// //             <div>
// //                 <h2 className="text-xl text-gray-500 font-semibold mb-4">Feature Importance & Predicted Rating</h2>
// //                 {predictedRating && (
// //                     <div className="mb-4 text-lg font-medium text-gray-400">
// //                     ⭐ Predicted Rating: <span className="text-blue-600">{predictedRating}</span> / 5
// //                     </div>
// //                 )}
// //                 <FeatureImportanceChart featureImportance={featureImportance} />
// //             </div>
// //             <div>
// //                 <FeatureInsights featureImportance={featureImportance} />
// //                 {/* Feature Importance Section */}
// //                 {featureImportance.length > 0 && (
// //                     <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
// //                         <h3 className="text-lg font-semibold mb-2 text-gray-400">Feature Importance</h3>
// //                         <ul>
// //                             {featureImportance.map(([feature, importance], index) => (
// //                             <li key={index} className="flex justify-between text-gray-600">
// //                                 <span>{feature.replace("_", " ")}</span>
// //                                 <span className="font-bold text-gray-500">{(importance * 100).toFixed(2)}%</span>
// //                             </li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                 )}

// //                 {error && (
// //                     <p className="text-red-500 mt-4">{error}</p>
// //                 )}
// //             </div>
// //             </div>

// //             <div className="flex flex-col items-center p-6 mt-4">
// //             <div className="flex gap-10 "> 
// //             <h2 className="text-3xl font-bold mb-6">Predict Review Rating</h2>
// //             <div className="md:col-span-2 flex justify-center">
// //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit}>
// //                 Predict Rating
// //                 </button>
// //                 </div>
// //             </div>

// //             <form  className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {Object.keys(features).map((feature) => (
// //                     <div key={feature} className="flex flex-col">
// //                     <label className="text-lg">{feature.replace("_", " ")}</label>
// //                     <input
// //                         type="number"
// //                         name={feature}
// //                         value={features[feature]}
// //                         onChange={handleChange}
// //                         className="p-2 border rounded"
// //                         required
// //                     />
// //                     </div>
// //                 ))}
// //             </form>

// //             {predictedRating && (
// //                 <div className="mt-4 p-4 bg-gray-500 rounded shadow">
// //                 <h3 className="text-xl">Predicted Rating: {predictedRating}</h3>
// //                 </div>
// //             )}

// //              {/* Bar Chart */}
// //             <div>
// //             {reviewData.length > 0 ? (
// //                 reviewData.map((property) => (
// //                 <div key={property.propertyID}>
// //                     <h2>Property ID: {property.propertyID}</h2>
// //                     <OwnerPageReviewCharts property={property.reviewScores} />
// //                 </div>
// //                 ))
// //             ) : (
// //                 <p>Loading review data...</p>
// //             )}
// //             </div>
// //             </div>

// //             <div>
// //                 <DualGaugeChart/>
// //             </div>
// //             </div>
        
// //     );
// // }

// // export default OwnerFeatureAnalysis;


// import React, { useEffect, useState } from "react";
// import FeatureImportanceChart from "../components/FeatureImportanceChart";
// import FeatureInsights from "../components/FeatureInsights";
// import DualGaugeChart from "../components/DualGaugeChart";
// import OwnerPageReviewCharts from "../components/OwnerPageReviewCharts";

// function OwnerFeatureAnalysis() {
//     const userID = localStorage.getItem("userID");
//     const [reviewData, setReviewData] = useState([]);

//     const fetchReviews = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/review_rates/${userID}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();
            
//             // Check if calender_dates exists in the response data
//             if (!data.calender_dates) {
//                 throw new Error('Property data is missing in the response');
//             }

//             // Extract and format the review scores for each property
//             const formattedData = Object.keys(data.calender_dates).map((propertyID) => {
//                 const reviewScores = data.calender_dates[propertyID][0]; // Assuming the first object contains review data
//                 const scores = [
//                     { name: "Accuracy", value: reviewScores.review_scores_accuracy },
//                     { name: "Check-in", value: reviewScores.review_scores_checkin },
//                     { name: "Cleanliness", value: reviewScores.review_scores_cleanliness },
//                     { name: "Communication", value: reviewScores.review_scores_communication },
//                     { name: "Location", value: reviewScores.review_scores_location },
//                     { name: "Value", value: reviewScores.review_scores_value },
//                 ];

//                 return {
//                     propertyID,
//                     reviewScores: scores,
//                 };
//             });

//             setReviewData(formattedData); // Store all properties data

//         } catch (error) {
//             console.error("Error fetching property data:", error);
//             alert("There was a problem fetching property data.");
//         }
//     };

//     useEffect(() => {
//         // fetch review rates of all properties
//         fetchReviews();
//     }, []);

//     const [features, setFeatures] = useState({
//         review_scores_accuracy: "4.6",
//         review_scores_cleanliness: "4.8",
//         review_scores_checkin: "3.8",
//         review_scores_communication: "4.1",
//         review_scores_location: "3.6",
//         review_scores_value: "3.8",
//     });

//     const [predictedRating, setPredictedRating] = useState(null);
//     const [error, setError] = useState(null);
//     const [featureImportance, setFeatureImportance] = useState([]);

//     // Handle input change
//     const handleChange = (e) => {
//         setFeatures({ ...features, [e.target.name]: e.target.value });
//     };

//     // Submit form data to Flask API
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setPredictedRating(null);

//         try {
//             const response = await fetch(`http://localhost:5000/analyze_review`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", Accept: "application/json" },
//                 body: JSON.stringify({
//                     features: Object.values(features).map(Number), // Convert values to numbers
//                 }),
//             });

//             const data = await response.json();
//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setPredictedRating(data.predicted_rating.toFixed(2));
//                 setFeatureImportance(
//                     Object.entries(data.feature_importance)
//                         .sort((a, b) => b[1] - a[1]) // Sort features by importance
//                 );
//             }
//         } catch (err) {
//             setError("Error connecting to the server.");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-6 mt-4">
//             <div className="flex gap-10">
//                 <h2 className="text-3xl font-bold mb-6">Reviews</h2>
//             </div>

//             <div className="flex p-6 max-w-full mx-auto bg-white rounded shadow">
//                 <div>
//                     <h2 className="text-xl text-gray-500 font-semibold mb-4">Feature Importance & Predicted Rating</h2>
//                     {predictedRating && (
//                         <div className="mb-4 text-lg font-medium text-gray-400">
//                             ⭐ Predicted Rating: <span className="text-blue-600">{predictedRating}</span> / 5
//                         </div>
//                     )}
//                     <FeatureImportanceChart featureImportance={featureImportance} />
//                 </div>
//                 <div>
//                     <FeatureInsights featureImportance={featureImportance} />
//                     {/* Feature Importance Section */}
//                     {featureImportance.length > 0 && (
//                         <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
//                             <h3 className="text-lg font-semibold mb-2 text-gray-400">Feature Importance</h3>
//                             <ul>
//                                 {featureImportance.map(([feature, importance], index) => (
//                                     <li key={index} className="flex justify-between text-gray-600">
//                                         <span>{feature.replace("_", " ")}</span>
//                                         <span className="font-bold text-gray-500">{(importance * 100).toFixed(2)}%</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {error && <p className="text-red-500 mt-4">{error}</p>}
//                 </div>
//             </div>

//             <div className="flex flex-col items-center p-6 mt-4">
//                 <div className="flex gap-10">
//                     <h2 className="text-3xl font-bold mb-6">Predict Review Rating</h2>
//                     <div className="md:col-span-2 flex justify-center">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit}>
//                             Predict Rating
//                         </button>
//                     </div>
//                 </div>

//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {Object.keys(features).map((feature) => (
//                         <div key={feature} className="flex flex-col">
//                             <label className="text-lg">{feature.replace("_", " ")}</label>
//                             <input
//                                 type="number"
//                                 name={feature}
//                                 value={features[feature]}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                     ))}
//                 </form>

//                 {predictedRating && (
//                     <div className="mt-4 p-4 bg-gray-500 rounded shadow">
//                         <h3 className="text-xl">Predicted Rating: {predictedRating}</h3>
//                     </div>
//                 )}

//                 {/* Display review data and charts for each property */}
//                 <div>
//                     {reviewData.length > 0 ? (
//                         reviewData.map((property) => (
//                             <div key={property.propertyID} className="mt-4">
//                                 <h2 className="text-2xl font-bold">Property ID: {property.propertyID}</h2>
//                                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                     {property.reviewScores.map((score, index) => (
//                                         <div key={index} className="flex flex-col">
//                                             <label className="text-lg">{score.name}</label>
//                                             <input
//                                                 type="number"
//                                                 name={score.name}
//                                                 value={score.value}
//                                                 readOnly
//                                                 className="p-2 border rounded"
//                                             />
//                                         </div>
//                                     ))}
//                                 </form>
//                                 <OwnerPageReviewCharts property={property.reviewScores} />
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading review data...</p>
//                     )}
//                 </div>
//             </div>

//             <div>
//                 <DualGaugeChart />
//             </div>
//         </div>
//     );
// }

// export default OwnerFeatureAnalysis;


import React, { useEffect, useState } from "react";
import FeatureImportanceChart from "../components/FeatureImportanceChart";
import FeatureInsights from "../components/FeatureInsights";
import DualGaugeChart from "../components/DualGaugeChart";
import OwnerPageReviewCharts from "../components/OwnerPageReviewCharts";

function OwnerFeatureAnalysis() {
    const userID = localStorage.getItem("userID");
    const [reviewData, setReviewData] = useState([]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/review_rates/${userID}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            // Check if calender_dates exists in the response data
            if (!data.calender_dates) {
                throw new Error('Property data is missing in the response');
            }

            // Extract and format the review scores for each property
            const formattedData = Object.keys(data.calender_dates).map((propertyID) => {
                const reviewScores = data.calender_dates[propertyID][0]; // Assuming the first object contains review data
                const scores = [
                    { name: "Accuracy", value: reviewScores.review_scores_accuracy },
                    { name: "Check-in", value: reviewScores.review_scores_checkin },
                    { name: "Cleanliness", value: reviewScores.review_scores_cleanliness },
                    { name: "Communication", value: reviewScores.review_scores_communication },
                    { name: "Location", value: reviewScores.review_scores_location },
                    // { name: "Rating", value: reviewScores.review_scores_rating },
                    { name: "Value", value: reviewScores.review_scores_value },
                ];
                
                // Extract Rating separately
                const rating = reviewScores.review_scores_rating;
                // alert(rating);

                return {
                    propertyID,
                    reviewScores: scores,
                    rating
                };
            });

            setReviewData(formattedData); // Store all properties data

        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data.");
        }
    };

    useEffect(() => {
        // fetch review rates of all properties
        fetchReviews();
        // handleSubmit();
        handleGetFeatureImportance();
    }, []);

    // const [features, setFeatures] = useState({
    //     review_scores_accuracy: "4.6",
    //     review_scores_cleanliness: "4.8",
    //     review_scores_checkin: "3.8",
    //     review_scores_communication: "4.1",
    //     review_scores_location: "3.6",
    //     review_scores_value: "3.8",
    // });

    const [predictedRatings, setPredictedRatings] = useState({}); // Store predicted ratings for each property
    const [featureImportance, setFeatureImportance] = useState([]);

    // Handle input change for specific property
    const handleChange = (e, propertyID) => {
        const { name, value } = e.target;
        setReviewData((prevData) => {
            const updatedData = prevData.map((property) => {
                if (property.propertyID === propertyID) {
                    const updatedReviewScores = property.reviewScores.map((score) =>
                        score.name === name ? { ...score, value } : score
                    );
                    return { ...property, reviewScores: updatedReviewScores };
                }
                return property;
            });
            return updatedData;
        });
    };

    // Submit form data to Flask API for a specific property
    // const handleSubmit = async (e, propertyID) => {
    //     e.preventDefault();
    //     setPredictedRatings((prevRatings) => ({ ...prevRatings, [propertyID]: null }));

    //     const property = reviewData.find((prop) => prop.propertyID === propertyID);
    //     const featureValues = property.reviewScores.map((score) => Number(score.value));

    //     try {
    //         const response = await fetch(`http://localhost:5000/analyze_review`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json", Accept: "application/json" },
    //             body: JSON.stringify({ features: featureValues }),
    //         });

    //         const data = await response.json();
    //         if (data.error) {
    //             setPredictedRatings((prevRatings) => ({
    //                 ...prevRatings,
    //                 [propertyID]: `Error: ${data.error}`,
    //             }));
    //         } else {
    //             setPredictedRatings((prevRatings) => ({
    //                 ...prevRatings,
    //                 [propertyID]: data.predicted_rating.toFixed(2),
    //             }));
    //             setFeatureImportance(
    //                 Object.entries(data.feature_importance)
    //                     .sort((a, b) => b[1] - a[1]) // Sort features by importance
    //             );
    //         }
    //     } catch (err) {
    //         setPredictedRatings((prevRatings) => ({
    //             ...prevRatings,
    //             [propertyID]: "Error connecting to the server.",
    //         }));
    //     }
    // };

    const handlePredictRating = async (e, propertyID) => {
        e.preventDefault();
        setPredictedRatings((prevRatings) => ({ ...prevRatings, [propertyID]: null }));
    
        const property = reviewData.find((prop) => prop.propertyID === propertyID);
        const featureValues = property.reviewScores.map((score) => Number(score.value));
    
        try {
            const response = await fetch(`http://localhost:5000/predict_review`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ features: featureValues }),
            });
    
            const data = await response.json();
            if (data.error) {
                setPredictedRatings((prevRatings) => ({
                    ...prevRatings,
                    [propertyID]: `Error: ${data.error}`,
                }));
            } else {
                setPredictedRatings((prevRatings) => ({
                    ...prevRatings,
                    [propertyID]: data.predicted_rating.toFixed(2),
                }));
            }
        } catch (err) {
            setPredictedRatings((prevRatings) => ({
                ...prevRatings,
                [propertyID]: "Error connecting to the server.",
            }));
        }
    };
    const handleGetFeatureImportance = async () => {
        try {
            const response = await fetch("http://localhost:5000/get_feature_importance", {
                method: "GET",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
    
            const data = await response.json();
            if (data.error) {
                setFeatureImportance([]);
            } else {
                setFeatureImportance(
                    Object.entries(data.feature_importance)
                        .sort((a, b) => b[1] - a[1]) // Sort features by importance
                );
            }
        } catch (err) {
            setFeatureImportance([]);
        }
    };
    
    return (
        <div className="flex flex-col items-center p-6 mt-4">
            <div className="flex gap-10">
                <h2 className="text-3xl font-bold mb-6">Reviews</h2>
            </div>
            <div className="flex p-6 min-w-[1200px] max-w-full mx-auto bg-white rounded shadow">
                <div className="w-1/2 p-4 border rounded-lg bg-white shadow-md">
                    <h2 className="text-xl text-gray-500 font-semibold mb-4">Feature Importance Analysis</h2>
                    {featureImportance.length > 0 && (
                        <FeatureImportanceChart featureImportance={featureImportance} />
                    )}
                </div>
                <div className="w-1/2 p-6 border rounded-lg bg-white shadow-md">
                    <div>
                    <FeatureInsights featureImportance={featureImportance} />
                    </div>
                    <div className="p-6 border rounded-lg bg-white shadow-md mt-4">
                        {/* Feature Importance Section */}
                        {featureImportance.length > 0 && (
                            <div className=" bg-white rounded w-full max-w-md">
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">Feature Importance</h3>
                                <ul>
                                    {featureImportance.map(([feature, importance], index) => (
                                        <li key={index} className="flex justify-between text-gray-600">
                                            <span>{feature.replace("_", " ")}</span>
                                            <span className="font-bold text-gray-500">{(importance * 100).toFixed(2)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* predictions for each property */}
            <h2 className="text-3xl font-bold m-6">Predict Review Rating for Each Property</h2>
            
            <div className="flex items-center p-6 m-2 min-w-[1200px] max-w-full mx-auto bg-white rounded shadow">      
                <div className="flex gap-10 flex-wrap">
                    {reviewData.length > 0 ? (
                        reviewData.map((property) => (
                            <div key={property.propertyID} className="flex gap-10 mt-4 w-full min-w-[1200px] rounded">
                                <div>
                                <h2 className="text-lg font-bold text-gray-500">Property ID: {property.propertyID}</h2>
                                <form onSubmit={(e) => handlePredictRating(e, property.propertyID)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {property.reviewScores.map((score, index) => (
                                        <div key={index} className="flex flex-col">
                                            <label className="text-m text-gray-500">{score.name}</label>
                                            <input
                                                type="number"
                                                name={score.name}
                                                value={score.value}
                                                onChange={(e) => handleChange(e, property.propertyID)}
                                                className="p-1 border rounded"
                                                required
                                            />
                                        </div>
                                    ))}
                                    <div className="md:col-span-2 flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                                        >
                                            Predict Rating
                                        </button>
                                    </div>
                                </form>
                                </div>

                                {/* <div>
                                {predictedRatings[property.propertyID] && (
                                    <div className="mt-4 p-4 bg-gray-500 rounded shadow">
                                        <h3 className="text-xl">Predicted Rating: {predictedRatings[property.propertyID]}</h3>
                                    </div>
                                )}
                                </div> */}

                                <div>
                                    <DualGaugeChart beforeRating={property.rating} afterRating={predictedRatings[property.propertyID]} />
                                </div>

                                <div>
                                <OwnerPageReviewCharts property={property.reviewScores} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading review data...</p>
                    )}
                </div>
            </div>

        
        </div>
    );
}

export default OwnerFeatureAnalysis;
