import React, { useEffect, useState } from "react";
import FeatureInsights from "../components/FeatureInsights";
import OwnerPageReviewCharts from "../components/OwnerPageReviewCharts";

function OwnerFeatureAnalysis() {
    const userID = localStorage.getItem("userID");
    const [reviewData, setReviewData] = useState([]);
    const [originalReviewData, setOriginalReviewData] = useState([]); // Stores unmodified values

    const fetchOwnReviewRates = async () => {
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

                return {
                    propertyID,
                    reviewScores: scores,
                    rating
                };
            });

            setReviewData(formattedData); // Store all properties data
            setOriginalReviewData(JSON.parse(JSON.stringify(formattedData))); // Deep copy to preserve original values
            console.log('original review rates',originalReviewData)

        } catch (error) {
            console.error("Error fetching property data:", error);
            alert("There was a problem fetching property data.");
        }
    };

    useEffect(() => {
        handlePredictReviewRates();
        fetchOwnReviewRates();
        fetchReviewsList();
        
    }, []);

    const [featureImportance, setFeatureImportance] = useState([]);
    const [reviewDataList, setReviewList] = useState([]);

    const fetchReviewsList = async () => {
        try {
            const response = await fetch(`http://localhost:5000/reviews/${userID}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            const data = await response.json();
            if (!data.reviews) {
                throw new Error('Property reviews data is missing in the response');
            }
    
            const formattedData = Object.keys(data.reviews).map((propertyID) => {
                return {
                    propertyID,
                    reviews: data.reviews[propertyID]
                };
            });
            setReviewList(formattedData);
    
        } catch (error) {
            console.error("Error fetching property reviews:", error);
            alert("There was a problem fetching property reviews.");
        }
    };

    const handlePredictReviewRates = async () => {
        try {
            const response = await fetch(`http://localhost:5000/predict_new_review_values/${userID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
        });

        const data = await response.json();
        console.log("Predicted Review Rates:", data); // Debugging
            // Hardcoded API response
            // const data = {
            //     "PredictedReviewRates": {
            //         "2352": {
            //             "feature_importance": {
            //                 "review_scores_accuracy": 4.2768,
            //                 "review_scores_checkin": 4.3293,
            //                 "review_scores_cleanliness": 4.3909,
            //                 "review_scores_communication": 4.3615,
            //                 "review_scores_location": 4.5089,
            //                 "review_scores_value": 4.1138
            //             }
            //         },
            //         "2354": {
            //             "feature_importance": {
            //                 "review_scores_accuracy": 4.1987,
            //                 "review_scores_checkin": 4.3012,
            //                 "review_scores_cleanliness": 4.3754,
            //                 "review_scores_communication": 4.3456,
            //                 "review_scores_location": 4.4921,
            //                 "review_scores_value": 4.0923
            //             }
            //         }
            //     }
            // };

            if (data.error) {
                setFeatureImportance({});
            }
            else
            {console.log("Predicted Review Rates (Hardcoded):", data);
    
            // Transforming the data to match the expected format
            const formattedData = Object.fromEntries(
                Object.entries(data.PredictedReviewRates).map(([propertyID, values]) => [
                    propertyID,
                    Object.entries(values.feature_importance).sort((a, b) => b[1] - a[1]), // Sort by importance
                ])
            );
    
            setFeatureImportance(formattedData);}
        } catch (err) {
            setFeatureImportance({});
        }
    };
    
    return (
        <div className="flex flex-col items-center p-6 mt-4">
            <div className="flex gap-10">
                <h2 className="text-3xl font-bold mb-6">Reviews</h2>
            </div>
            {/* predictions for each property */}
            
            <div className="flex items-center p-6 m-2 min-w-[1200px] max-w-full mx-auto bg-white rounded shadow">      
            <div className="flex gap-10 flex-wrap">
                    {reviewData.length > 0 ? (
            reviewData.map((property) => {
                const propertyFeatureImportance = featureImportance[property.propertyID] || [];
                return (
                    <div key={property.propertyID} className="flex gap-10 mt-4 w-full min-w-[1200px] rounded">
                        <div className="w-1/2">
                            <h3 className="text-xl font-bold text-gray-700">{`Property ID: ${property.propertyID}`}</h3>
                            <OwnerPageReviewCharts 
                                property={originalReviewData.find(p => p.propertyID === property.propertyID)?.reviewScores || {}} 
                                featureImportance={propertyFeatureImportance} 
                            />
                        </div>
                        <div className="w-[500px]">
                            <FeatureInsights 
                                featureImportance={propertyFeatureImportance} 
                                reviewData={property.reviewScores} 
                            />
                        </div>
                    </div>
                );
            })
        )
                    : (
                        <p>Loading review data...</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center p-6 mt-4">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
        <div className="flex text-black items-center p-6 m-2 min-w-[1200px] max-w-full mx-auto bg-white rounded shadow">
            <div className="flex gap-10 flex-wrap">
                {reviewDataList.length > 0 ? (
                    reviewDataList.map((property) => (
                        <div key={property.propertyID} className="flex gap-10 mt-4 w-full min-w-[1200px] rounded">
                            <h3 className="text-xl font-bold">{`Reviews for Property ID: ${property.propertyID}`}</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 w-full">
                                {Array.isArray(property.reviews) && property.reviews.length > 0 ? (
                                    property.reviews.map((review, index) => (
                                        <div key={index} className="bg-gray-200 p-4 rounded shadow">
                                            <p><strong>Review ID:</strong> {review.id}</p>
                                            <p><strong>Date:</strong> {review.date}</p>
                                            <p><strong>Reviewer Name:</strong> {review.reviewer_name}</p>
                                            <p><strong>Review:</strong> {review.reviews}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available for this property.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading review data...</p>
                )}
            </div>
        </div>
    </div>   
        </div>
    );
}

export default OwnerFeatureAnalysis;
