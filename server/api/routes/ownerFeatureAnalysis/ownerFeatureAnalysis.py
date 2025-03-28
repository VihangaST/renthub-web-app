import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask import Blueprint
from flask_cors import CORS
from classModels.listings import Listing
from classModels.reviewRates import ReviewRate  
from classModels.review_detailed import ReviewDetailed
from classModels.listing_detailed import ListingDetailed
ownerFeatureAnalysis_bp = Blueprint('ownerFeatureAnalysis_bp', __name__)

@ownerFeatureAnalysis_bp.route('/testre')
def get_test_message():
    return jsonify("Hello there rentplaceslist")

model_filename = f"models/n_random_forest_entire_home_apt.pkl"

@ownerFeatureAnalysis_bp.route('/review_rates/<int:user_id>', methods=['GET'])
def get_calenderDates(user_id):
    
    try:
        print("user_id:", user_id)

        # Fetch all property_IDs where host_ID matches user_id
        properties = Listing.query.filter_by(host_ID=user_id).all()
        print("Properties:", properties)
        property_ids = [prop.list_ID for prop in properties]

        if not property_ids:
            return jsonify({"message": "No properties found for the given user"}), 404

        # Fetch calendar dates for the fetched property IDs
        reviewRates = ReviewRate.query.filter(ReviewRate.id.in_(property_ids)).all()

        calender_dates_dict = {prop_id: [] for prop_id in property_ids}  # Initialize all properties with empty lists

        for date_record in reviewRates:
            property_id = date_record.id

            calender_dates_dict[property_id].append({
                "review_scores_rating": date_record.review_scores_rating,
                "review_scores_accuracy": date_record.review_scores_accuracy,
                "review_scores_cleanliness": date_record.review_scores_cleanliness,
                "review_scores_checkin": date_record.review_scores_checkin,
                "review_scores_communication": date_record.review_scores_communication,
                "review_scores_location": date_record.review_scores_location,
                "review_scores_value": date_record.review_scores_value
            })

        print("review rates by property:", calender_dates_dict)
        return jsonify({"message": "Property calendar data fetched successfully", "calender_dates": calender_dates_dict}), 200

    except Exception as e:
        print(f"Error fetching property calendar data: {e}")
        return jsonify({"message": "An error occurred while fetching property calendar data"}), 500


@ownerFeatureAnalysis_bp.route('/reviews/<int:user_id>', methods=['GET'])
def get_reviews(user_id):
    
    try:
        print("user_id:", user_id)

        # Fetch all property_IDs where host_ID matches user_id
        properties = Listing.query.filter_by(host_ID=user_id).all()
        print("Properties:", properties)
        property_ids = [prop.list_ID for prop in properties]

        if not property_ids:
            return jsonify({"message": "No properties found for the given user"}), 404

        # Fetch review for the fetched property IDs
        reviews = ReviewDetailed.query.filter(ReviewDetailed.listing_id.in_(property_ids)).all()

        reviews_dict = {prop_id: [] for prop_id in property_ids}  # Initialize all properties with empty lists

        for review in reviews:
            property_id = review.listing_id

            reviews_dict[property_id].append({
                "listing_id": review.listing_id,
                "id": review.id,
                "date": review.date.strftime('%Y-%m-%d'),
                "reviewer_id": review.reviewer_id,
                "reviewer_name": review.reviewer_name,
                "reviews": review.reviews
            })

        print("review rates by property:", reviews_dict)
        return jsonify({"message": "Property review data fetched successfully", "reviews": reviews_dict}), 200

    except Exception as e:
        print(f"Error fetching property review data: {e}")
        return jsonify({"message": "An error occurred while fetching property review data"}), 500

# Load trained model, scaler, and label encoders
model = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\featureAnalysis\reviewScorePredictionModel.pkl")
scaler = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\featureAnalysis\reviewScorePredictionScaler.pkl")
label_encoders = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\featureAnalysis\reviewScorePrediction_label_encoders.pkl")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Define features and targets
features = ['property_type', 'room_type', 'accommodates', 'bathrooms_text', 'bedrooms', 'beds']
targets = ['review_scores_accuracy', 'review_scores_cleanliness', 'review_scores_checkin',
           'review_scores_communication', 'review_scores_location', 'review_scores_value']

@ownerFeatureAnalysis_bp.route('/predict_new_review_values/<int:user_id>', methods=['GET'])
def predict(user_id):
    try:
        # Sample user ID (Replace with actual request data if needed)
        # user_id = 2582

        # Fetch all property_IDs where host_ID matches user_id
        properties = Listing.query.filter_by(host_ID=user_id).all()
        property_ids = [prop.list_ID for prop in properties]

        if not property_ids:
            return jsonify({"message": "No properties found for the given user"}), 404

        # Extract data from the database for each property
        listings = ListingDetailed.query.filter(ListingDetailed.id.in_(property_ids)).all()

        predicted_review_rates = {}

        for listing in listings:
            # Extract data from each listing
            data = {
                "property_type": listing.property_type,
                "room_type": listing.room_type,
                "accommodates": listing.accommodates,
                "bathrooms_text": listing.bathrooms_text,
                "bedrooms": listing.bedrooms,
                "beds": listing.beds
            }

            # Convert JSON data to DataFrame (single-row DataFrame)
            df = pd.DataFrame([data])

            # Apply label encoding only for categorical columns
            categorical_cols = ["property_type", "room_type", "bathrooms_text"]
            for col in categorical_cols:
                if col in df.columns:
                    df[col] = label_encoders[col].transform(df[col])

            # Select only required features
            df = df[features]

            # Convert DataFrame to a 2D array before scaling
            X = scaler.transform(df)

            # Make predictions
            predictions = model.predict(X)

            # Store predictions for this property ID
            predicted_review_rates[str(listing.id)] = {  # Ensure JSON keys are strings
                "feature_importance": {
                    target: float(pred) for target, pred in zip(targets, predictions[0])
                }
            }

        print("Predicted Review Rates:", predicted_review_rates)
        return jsonify({"PredictedReviewRates": predicted_review_rates})

    except Exception as e:
        return jsonify({'error': str(e)}), 400
