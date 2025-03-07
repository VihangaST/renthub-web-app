const FeatureInsights = ({ featureImportance }) => {
    if (!featureImportance.length) return null;
  
    const topFeature = featureImportance[0]; // Most important feature
    console.log("Top Feature:", topFeature);
  
    const suggestions = {
      review_scores_cleanliness: "Ensure cleanliness! Guests appreciate spotless spaces.",
      review_scores_communication: "Improve response time and provide clear instructions.",
      review_scores_accuracy: "Make sure descriptions and photos accurately reflect your property.",
      review_scores_location: "Enhance guest experience with detailed travel guides.",
      review_scores_value: "Consider offering discounts or extra amenities.",
      review_scores_checkin: "Simplify the check-in process with clear instructions and keyless entry options.",
    };
  
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded text-gray-500">
        <h3 className="text-lg text-gray-400 font-semibold">Top Factor Impacting Rating: {topFeature[0]}</h3>
        <p>{suggestions[topFeature[0]] || "Focus on this aspect to improve ratings."}</p>
      </div>
    );
  };
  
  export default FeatureInsights;
  