const FeatureInsights = ({ featureImportance = [], reviewData = [] }) => {
    if (!featureImportance.length || !reviewData.length) return null;

    console.log("_________featureImportance", featureImportance);
    console.log("_________reviewData", reviewData);

    const marketReviewRates = Object.fromEntries(featureImportance);

    const featureNameMap = {
        Accuracy: "review_scores_accuracy",
        "Check-in": "review_scores_checkin",
        Cleanliness: "review_scores_cleanliness",
        Communication: "review_scores_communication",
        Location: "review_scores_location",
        Value: "review_scores_value",
    };

    // Extract review scores
    const extractedReviewData = {};
    reviewData.forEach((score) => {
        const mappedFeature = featureNameMap[score.name];
        if (mappedFeature) {
            extractedReviewData[mappedFeature] = score.value || 0;  // Default to 0 if undefined
        }
    });

    // Check if the property is new (all scores are 0)
    const isNewProperty = Object.values(extractedReviewData).every((val) => val === 0);

    return (
        <div className="mt-4 p-4 bg-gray-100 rounded text-gray-700">
            <h3 className="text-lg text-blue-600 font-semibold">
                Feature Comparison Insights
            </h3>

            {isNewProperty ? (
                <div className="text-md text-gray-600 mt-2">
                    <p>This property is new and does not have guest reviews yet.</p> 
<p>                    Below are the <span>Expected Guest Scores</span> based on market trends:</p>                    <ul className="mt-2 list-disc list-inside">
                        {Object.keys(marketReviewRates).map((feature) => (
                            <li key={feature} className="mb-2">
                                <strong className="text-blue-500">
                                    {feature.replace(/_/g, " ")}:
                                </strong>{" "}
                                Expected Score: {marketReviewRates[feature]?.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ul className="mt-2 list-disc list-inside">
                    {Object.keys(marketReviewRates).map((feature) => {
                        const userScore = parseFloat(extractedReviewData[feature]);
                        const marketAvg = parseFloat(marketReviewRates[feature]);

                        const isUnderperforming =
                            !isNaN(userScore) && !isNaN(marketAvg) && userScore < marketAvg;

                        return (
                            <li key={feature} className="mb-2">
                                <strong className={`text-lg ${isUnderperforming ? "text-red-600" : "text-green-600"}`}>
                                    {feature.replace(/_/g, " ")}:
                                </strong>{" "}
                                {isUnderperforming ? "Consider improvements" : "Great job!"} <br />
                                <span className="text-sm text-gray-500">
                                    Your score: {userScore || "0"} | Market Avg: {marketAvg.toFixed(2)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FeatureInsights;
