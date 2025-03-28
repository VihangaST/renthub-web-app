from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
from classModels.reviewRates import ReviewRate
from classModels.listing_detailed import ListingDetailed
from classModels.calenderdates import CalenderDates
from classModels.review_detailed import ReviewDetailed
from datetime import datetime
import joblib
import pandas as pd
import numpy as np
from extensions import db
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError
from tensorflow.keras.metrics import MeanAbsoluteError
from datetime import datetime
import math 
property_bp = Blueprint('property', __name__)
@property_bp.route('/propertytest')
def get_test_message():
    return jsonify("Hello there property")

# create an api end point for fetch property data from listings model
@property_bp.route('/property/<int:property_id>', methods=['GET'])
def get_property(property_id):
    try:
        print("property_id",property_id)
        property = Listing.query.filter_by(list_ID=property_id).first()

        if property:
            # Convert the SQLAlchemy object to a dictionary
            property_data = {
                "table_ID": property.table_ID,
                "list_ID": property.list_ID,
                "list_name": property.list_name,
                "host_ID": property.host_ID,
                "host_name": property.host_name,
                "neighbourhood": property.neighbourhood,
                "latitude": property.latitude,
                "longitude": property.longitude,
                "room_type": property.room_type,
                "price": property.price,
                # "minmum_nights": property.minmum_nights,
                # "number_of_reviews": property.number_of_reviews,
                # "calculated_host_listings_count": property.calculated_host_listings_count,
                # "availability_365": property.availability_365,
                # "number_of_reviews_ltm": property.number_of_reviews_ltm
            }
            return jsonify({"message": "Property data fetched successfully", "property": property_data}), 200
        else:
            return jsonify({"message": "No property data found"}), 404
    except Exception as e:
        # Log or print the error for debugging
        print(f"Error fetching property data: {e}")
        return jsonify({"message": "An error occurred while fetching property data"}), 500

model = load_model(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\occupancyPrediction\occupancyPredictionModel.h5", compile=False)
model.compile(optimizer="adam", loss=MeanSquaredError(), metrics=[MeanAbsoluteError()])

scaler = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\featureAnalysis\reviewScorePredictionScaler.pkl")
label_encoders = joblib.load(r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\occupancyPrediction\occupancyPredictionLablEncoders.pkl")

# === Define structure ===
categorical_cols = ["neighbourhood", "property_type", "room_type", "bathrooms_text"]
scaler_input_cols = ['property_type', 'room_type', 'accommodates',
                     'bathrooms_text', 'bedrooms', 'beds']
final_model_input_order = ['neighbourhood', 'property_type', 'room_type',
                           'accommodates', 'bathrooms_text', 'bedrooms',
                           'beds', 'days_from_today']
# Route for prediction
@property_bp.route('/availability', methods=['POST'])
def predict():
    try: 
        data = request.get_json()
        listing_id = data.get("list_ID")
        date_list = data.get("dates")
        print('data',data)

        if not listing_id or not date_list:
            return jsonify({"error": "Missing 'listing_id' or 'dates' in request"}), 400

        # === Fetch listing from DB ===
        listing = ListingDetailed.query.filter_by(id=listing_id).first()

        if not listing:
            return jsonify({"error": f"Listing ID {listing_id} not found"}), 404

        # === Build a dictionary from listing DB row ===
        listing_data = {
            "neighbourhood": listing.neighbourhood,
            "property_type": listing.property_type,
            "room_type": listing.room_type,
            "accommodates": listing.accommodates,
            "bathrooms_text": listing.bathrooms_text,
            "bedrooms": listing.bedrooms,
            "beds": listing.beds
        }

        # === Validate required fields ===
        if any(value is None for value in listing_data.values()):
            return jsonify({"error": f"Listing ID {listing_id} has missing fields"}), 422

        predictions = []

        for date_str in date_list:
            input_row = listing_data.copy()
            input_row["date"] = date_str

            df = pd.DataFrame([input_row])
            df["date"] = pd.to_datetime(df["date"])
            df["days_from_today"] = (df["date"] - pd.to_datetime(datetime.today())).dt.days
            df.drop(columns=["date"], inplace=True)

            # Encode categoricals
            for col in categorical_cols:
                encoder = label_encoders[col]
                df[col] = encoder.transform(df[col])

            # Scale numeric subset
            scaled_data = scaler.transform(df[scaler_input_cols])
            df[scaler_input_cols] = scaled_data

            # Prepare final input
            final_input = df[final_model_input_order].values

            # Predict
            raw_output = model.predict(final_input)[0][0]
            probability = 1 / (1 + math.exp(-raw_output))
            availability = int(probability >= 0.5)

            predictions.append({
                "date": date_str,
                "predicted_value": float(raw_output),
                "probability": round(probability, 4),
                "availability": availability
            })

        return jsonify({
            "listing_id": listing_id,
            "predictions": predictions
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@property_bp.route('/reviewrates/<int:property_id>', methods=['GET'])
def get_reviewRates(property_id):
    try:
        print("property_id",property_id)
        # Query the database for the property with list_ID 2352
        property = ReviewRate.query.filter_by(id=property_id).first()
        print('property',property)

        if property:
            # Convert the SQLAlchemy object to a dictionary
            property_data = {
                "id": property.id,
                "review_scores_rating": property.review_scores_rating,
                "review_scores_accuracy": property.review_scores_accuracy,
                "review_scores_cleanliness": property.review_scores_cleanliness,
                "review_scores_checkin": property.review_scores_checkin,
                "review_scores_communication": property.review_scores_communication,
                "review_scores_location": property.review_scores_location,
                "review_scores_value": property.review_scores_value
            }
            return jsonify({"message": "Property review data fetched successfully", "property": property_data}), 200
        else:
            return jsonify({"message": "No property review data found"}), 404
    except Exception as e:
        # Log or print the error for debugging
        print(f"Error fetching property data: {e}")
        return jsonify({"message": "An error occurred while fetching property data"}), 500

@property_bp.route('/calenderdates/<int:property_id>', methods=['GET'])
def get_calenderDates(property_id):
    try:
        print("property_id in calender dates", property_id)
        # Query the database for all records with the specified property_id
        # calender_dates = CalenderDates.query.all() 
        calender_dates = CalenderDates.query.filter_by(property_ID=property_id).all()
        print('calender dates', calender_dates)
        
        if calender_dates:
            # Convert the SQLAlchemy objects to a list of dictionaries
            calender_dates_list = [
                {
                    "property_id": date_record.property_ID,
                    "date": date_record.date.strftime('%Y-%m-%d'),  # Format the date to string (optional)
                    "availability": date_record.availability,
                    "tenant_id":date_record.tenant_ID
                }
                for date_record in calender_dates
            ]
            return jsonify({"message": "Property calendar data fetched successfully", "calender_dates":calender_dates_list }), 200
        else:
            return jsonify({"message": "No property calendar data found"}), 404
    except Exception as e:
        # Log or print the error for debugging
        print(f"Error fetching property calendar data: {e}")
        return jsonify({"message": "An error occurred while fetching property calendar data"}), 500

@property_bp.route('/book', methods=['POST'])
def book_property():
    try:
        data = request.get_json()
        propertyID = data.get('propertyID')
        date_str = data.get('date')
        tenantID = data.get('userID')
        print('propertyID',propertyID,'date',date_str,'tenantID',tenantID)
        # Convert the date string to 'YYYY-MM-DD' format
        date_obj = datetime.strptime(date_str, '%a %b %d %Y').date()  # e.g., '2025-02-21'

        calendar_entry = CalenderDates(
                property_ID=propertyID,
                date=date_obj,
                availability=1,  # Mark as booked
                tenant_ID=tenantID
            )
        db.session.add(calendar_entry)

        db.session.commit()

        return jsonify({"message": "Property booked successfully"}), 200


    except Exception as e:
        print(f"Error booking property: {e}")
        return jsonify({"message": "An error occurred while booking property"}), 500


@property_bp.route('/removeBooking', methods=['DELETE'])
def remove_booking():
    try:
       
        data = request.get_json()
        # Extract data
        date = data.get('date')
        user_id = data.get('userID')
        property_id = data.get('propertyID')
        print('removeBooking',date,user_id,property_id)
        if not date or not user_id or not property_id:
            return jsonify({'message': 'Missing required fields'}), 400

        # Convert the date to 'YYYY-MM-DD' format
        try:
            date_obj = datetime.strptime(date, "%a %b %d %Y")  # Parse the input date string
            formatted_date = date_obj.strftime("%Y-%m-%d")  # Format it as 'YYYY-MM-DD'
        except ValueError:
            return jsonify({'message': 'Invalid date format'}), 400

       # Find the booking record
        booking = CalenderDates.query.filter_by(property_ID=property_id, date=date_obj, tenant_ID=user_id, availability=1).first()

        if not booking:
            return jsonify({'message': 'No booking found to remove'}), 404
        
        # Delete the booking record
        db.session.delete(booking)
        db.session.commit()  # Commit changes to the database

        return jsonify({'message': 'Booking removed successfully'}), 200

    except Exception as e:
        # If an error occurs during deletion
        db.session.rollback()
        return jsonify({'message': 'Error removing booking', 'error': str(e)}), 500

@property_bp.route('/property_reviews/<int:property_id>', methods=['GET'])
def get_property_reviews(property_id):
    try:
        reviews = ReviewDetailed.query.filter_by(listing_id=property_id).all()
        
        if not reviews:
            return jsonify({"message": "No reviews found for this property", "reviews": {}}), 404
        
        review_data = {
            property_id: [
                {
                    "id": review.id,
                    "date": review.date.strftime("%Y-%m-%d"),
                    "reviewer_id": review.reviewer_id,
                    "reviewer_name": review.reviewer_name,
                    "review": review.reviews
                }
                for review in reviews
            ]
        }
        
        return jsonify({"reviews": review_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

