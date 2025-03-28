from flask import Blueprint, jsonify, request, current_app
from datetime import datetime
import joblib
import pandas as pd
import numpy as np
from extensions import db
from classModels.calender import Calender
from classModels.listings import Listing
import tensorflow as tf
from tensorflow.keras.models import load_model
from keras.losses import MeanSquaredError
from datetime import datetime, timedelta
from sklearn.preprocessing import LabelEncoder
from classModels.listing_detailed import ListingDetailed

ownerPricePredictions_bp = Blueprint('ownerPricePredictions_bp', __name__)

@ownerPricePredictions_bp.route('/priceHistory/<int:user_id>', methods=['GET'])
def get_price_history(user_id):
    try:
        # Fetch all property_IDs where host_ID matches user_id
        properties = Listing.query.filter_by(host_ID=user_id).all()
        property_ids = [prop.list_ID for prop in properties]

        if not property_ids:
            return jsonify({"message": "No properties found for the given user"}), 404

        # Fetch calendar dates for the fetched property IDs
        calender_dates = Calender.query.filter(Calender.Listing_ID.in_(property_ids)).all()
        # print("Calender dates:", calender_dates)

        calender_dates_dict = {prop_id: [] for prop_id in property_ids}  # Initialize all properties with empty lists
        print("Calender dates dict:", calender_dates_dict)

        for date_record in calender_dates:
            property_id = date_record.Listing_ID
            print("Property ID:", property_id)

            calender_dates_dict[property_id].append({
                "date": date_record.Date.strftime('%Y-%m-%d'),
                "price": date_record.Price,
                "adjusted_price": date_record.Adjusted_price
            })

        print("price variation by property:", calender_dates_dict)
        return jsonify({"message": "Property calendar data fetched successfully", "calender_dates": calender_dates_dict}), 200

    except Exception as e:
        print(f"Error fetching property calendar data: {e}")
        return jsonify({"message": "An error occurred while fetching property calendar data"}), 500


# Load trained model, scaler, and label encoders
model = load_model(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\pricePredictionModel\pricePredictionModel.h5",custom_objects={"mse": MeanSquaredError()})
scaler = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\pricePredictionModel\pricePredictionScaler.pkl")
label_encoders = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\pricePredictionModel\pricePredictionLablEncoders.pkl")

# Define features and targets
features = ['neighbourhood','property_type', 'room_type', 'accommodates', 'bathrooms_text', 'bedrooms', 'beds']
targets = ['price']

from flask import request, jsonify
from datetime import datetime, timedelta
import numpy as np

@ownerPricePredictions_bp.route('/predict/<int:property_id>', methods=['GET'])
def predict(property_id):
    try:
        # Extract year and month from request arguments
        year = request.args.get('year', type=int)
        month = request.args.get('month', type=int)

        if year is None or month is None:
            return jsonify({"error": "Year and month are required parameters"}), 400

        # Validate month range
        if month < 0 or month > 11:
            return jsonify({"error": "Invalid month value. It should be between 0 (January) and 11 (December)."}), 400

        # Fetch the specific property details
        listing = ListingDetailed.query.filter_by(id=property_id).first()

        if not listing:
            return jsonify({"error": "Property not found"}), 404

        def encode_value(feature, value):
            encoder = label_encoders.get(feature)
            if encoder and value in encoder.classes_:
                return encoder.transform([value])[0]
            return 0  # Default if the value isn't in the encoder classes

        # Extract property details
        neighbourhood = listing.neighbourhood
        room_type = listing.room_type
        property_type = listing.property_type
        accommodates = listing.accommodates
        bathrooms_text = listing.bathrooms_text
        bedrooms = listing.bedrooms
        beds = listing.beds

        # Encode categorical features
        neighbourhood_encoded = encode_value("neighbourhood", neighbourhood)
        room_type_encoded = encode_value("room_type", room_type)
        property_type_encoded = encode_value("property_type", property_type)
        bathrooms_text_encoded = encode_value("bathrooms_text", bathrooms_text)

        predictions = []
        start_date = datetime(year, month + 1, 1)  # Convert month index to actual month (1-12)

        # Predict prices for the entire selected month
        for day in range(1, 32):  # Maximum possible days in a month
            try:
                prediction_date = start_date.replace(day=day)
            except ValueError:
                break  # If the day is invalid (e.g., Feb 30), exit loop

            # Prepare input features
            input_features = np.array([
                neighbourhood_encoded, room_type_encoded, property_type_encoded,
                accommodates, bathrooms_text_encoded, bedrooms, beds, day
            ]).reshape(1, -1)

            # Scale the input
            input_features_scaled = scaler.transform(input_features)

            # Make prediction
            prediction = model.predict(input_features_scaled)[0][0]

            # Reverse log transformation to get actual price
            prediction = np.expm1(prediction)

            # Store prediction with formatted date
            date_str = prediction_date.strftime("%Y-%m-%d")
            predictions.append({"date": date_str, "predicted_price": round(float(prediction), 2)})

            print(f"Prediction",predictions)

        return jsonify({"property_id": property_id, "predictions": predictions})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
