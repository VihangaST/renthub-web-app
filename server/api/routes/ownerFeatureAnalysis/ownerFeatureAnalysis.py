# import joblib
# # import shap
# import numpy as np
# import pandas as pd
# from flask import Flask, request, jsonify
# from flask import Blueprint
# from flask_cors import CORS
# import pickle



# ownerFeatureAnalysis_bp = Blueprint('ownerFeatureAnalysis_bp', __name__)

# @ownerFeatureAnalysis_bp.route('/testre')
# def get_test_message():
#     return jsonify("Hello there rentplaceslist")


# model_filename = f"models/n_random_forest_entire_home_apt.pkl"

# model = joblib.load(model_filename)

# # Define features used in training
# feature_columns = [
#     'review_scores_accuracy', 
#     'review_scores_cleanliness', 
#     'review_scores_checkin', 
#     'review_scores_communication', 
#     'review_scores_location', 
#     'review_scores_value'
# ]

# # Compute feature importance
# feature_importance = model.feature_importances_
# importance_dict = {feature_columns[i]: feature_importance[i] for i in range(len(feature_columns))}

# @ownerFeatureAnalysis_bp.route('/analyze_review', methods=['POST'])
# # def predict():
# #     try:
# #         # Get data from request
# #         data = request.json  # Data will be sent as JSON
# #         print("Data:", data)
# #         features = data["features"]  # Expecting a list of feature values

# #         # Convert to numpy array for prediction
# #         input_data = np.array(features).reshape(1, -1)

# #         # Make prediction
# #         predicted_rating = model.predict(input_data)[0]

# #         # Return the predicted rating
# #         return jsonify({"predicted_rating": predicted_rating})
# #         # return jsonify("done")

# #     except Exception as e:
# #         return jsonify({"error": str(e)})

# def analyze_review():
#     try:
#         data = request.json.get("features", [])
#         input_data = pd.DataFrame([data], columns=feature_columns)
#         prediction = model.predict(input_data)[0]

#         return jsonify({
#             "predicted_rating": round(prediction, 2),
#             "feature_importance": importance_dict  # Send feature importance
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)})




# *****************************

import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask import Blueprint
from flask_cors import CORS
import pickle

from classModels.listings import Listing
from classModels.reviewRates import ReviewRate  

ownerFeatureAnalysis_bp = Blueprint('ownerFeatureAnalysis_bp', __name__)
# CORS(ownerFeatureAnalysis_bp) 

@ownerFeatureAnalysis_bp.route('/testre')
def get_test_message():
    return jsonify("Hello there rentplaceslist")


model_filename = f"models/n_random_forest_entire_home_apt.pkl"

def load_model():
    try:
        return joblib.load(model_filename)
    except Exception as e:
        print(f"Error loading model: {e}")
        return None


# @ownerFeatureAnalysis_bp.route('/analyze_review', methods=['POST'])
# def analyze_review():
#     try:
#         model = load_model()
#         if model is None:
#             raise RuntimeError("Failed to load model")

#         # Define features used in training
#         feature_columns = [
#             'review_scores_accuracy', 
#             'review_scores_cleanliness', 
#             'review_scores_checkin', 
#             'review_scores_communication', 
#             'review_scores_location', 
#             'review_scores_value'
#         ]

#         # Compute feature importance
#         feature_importance = model.feature_importances_
#         importance_dict = {feature_columns[i]: feature_importance[i] for i in range(len(feature_columns))}

#         data = request.json.get("features", [])
#          # Ensure correct number of features
#         if len(data) != len(feature_columns):
#             return jsonify({"error": f"Expected {len(feature_columns)} features, but got {len(data)}"}), 400

#         input_data = pd.DataFrame([data], columns=feature_columns)
#         prediction = model.predict(input_data)[0]

#         print("Prediction:", prediction)

#         return jsonify({
#             "predicted_rating": round(prediction, 2),
#             "feature_importance": importance_dict  # Send feature importance
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)})

@ownerFeatureAnalysis_bp.route('/get_feature_importance', methods=['GET'])
def get_feature_importance():
    try:
        model = load_model()
        if model is None:
            raise RuntimeError("Failed to load model")

        # Define features used in training
        feature_columns = [
            'review_scores_accuracy', 
            'review_scores_cleanliness', 
            'review_scores_checkin', 
            'review_scores_communication', 
            'review_scores_location', 
            'review_scores_value'
        ]

        # Compute feature importance
        feature_importance = model.feature_importances_
        importance_dict = {feature_columns[i]: feature_importance[i] for i in range(len(feature_columns))}

        return jsonify({
            "feature_importance": importance_dict
        })

    except Exception as e:
        return jsonify({"error": str(e)})


@ownerFeatureAnalysis_bp.route('/predict_review', methods=['POST'])
def predict_review():
    try:
        model = load_model()
        if model is None:
            raise RuntimeError("Failed to load model")

        # Define features used in training
        feature_columns = [
            'review_scores_accuracy', 
            'review_scores_cleanliness', 
            'review_scores_checkin', 
            'review_scores_communication', 
            'review_scores_location', 
            'review_scores_value'
        ]

        # Extract features from the request
        data = request.json.get("features", [])

        # Ensure the correct number of features
        if len(data) != len(feature_columns):
            return jsonify({"error": f"Expected {len(feature_columns)} features, but got {len(data)}"}), 400

        input_data = pd.DataFrame([data], columns=feature_columns)
        prediction = model.predict(input_data)[0]

        return jsonify({
            "predicted_rating": round(prediction, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})


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
        calender_dates = ReviewRate.query.filter(ReviewRate.id.in_(property_ids)).all()

        calender_dates_dict = {prop_id: [] for prop_id in property_ids}  # Initialize all properties with empty lists

        for date_record in calender_dates:
            property_id = date_record.id

            # if property_id not in calender_dates_dict:
            #     calender_dates_dict[property_id] = []


            calender_dates_dict[property_id].append({
                "review_scores_rating": date_record.review_scores_rating,
                "review_scores_accuracy": date_record.review_scores_accuracy,
                "review_scores_cleanliness": date_record.review_scores_cleanliness,
                "review_scores_checkin": date_record.review_scores_checkin,
                "review_scores_communication": date_record.review_scores_communication,
                "review_scores_location": date_record.review_scores_location,
                "review_scores_value": date_record.review_scores_value
            })

        print("Calendar dates by property:", calender_dates_dict)
        return jsonify({"message": "Property calendar data fetched successfully", "calender_dates": calender_dates_dict}), 200

    except Exception as e:
        print(f"Error fetching property calendar data: {e}")
        return jsonify({"message": "An error occurred while fetching property calendar data"}), 500

