import React from "react";

function ReviewCard({ review }) {
    console.log('review:', review);
    return (
        <div className="w-full flex bg-gray-100 p-4 mb-3 rounded shadow-md border">
            <div className="w-1/2">
            <p className="text-sm text-gray-600"><strong>Reviewer:</strong> {review.reviewer_name} (ID: {review.reviewer_id})</p>
            <p className="text-sm text-gray-500"><strong>Date:</strong> {review.date}</p>
            </div>
            <p className="text-gray-800 mt-2">"{review.review}"</p>
        </div>
    );
}

export default ReviewCard;
