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
        # property = Property.query.get(property_id=2352)
        # Query the database for the property with list_ID 2352
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

# Load the trained model (you can dynamically load based on user input)
# def load_model(list_ID):
#     # Load model for the given property listing ID
#     model_filename = f"models/property_2354.pkl"
#     model = joblib.load(model_filename)
#     return model


# Load trained model, scaler, and label encoders
# model_path = r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\occupancyPrediction\occupancyPredictionModel.h5"
# scaler_path = r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\featureAnalysis\reviewScorePredictionScaler.pkl"
# label_encoders_path = r"D:\University\Academic\Sem 06\data management project\new code\server\api\models\occupancyPrediction\occupancyPredictionLablEncoders.pkl"

# model = load_model(model_path, custom_objects={"mse": MeanSquaredError()})
# scaler = joblib.load(scaler_path)
# label_encoders = joblib.load(label_encoders_path)
# === Load Model and Tools ===
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

# List of features expected (update based on actual model training features)
# expected_features = ["neighbourhood",  "room_type","property_type","accommodates" ,"bathrooms_text", "bedrooms","beds","days_from_today"]


# # Define features and target variable
# FEATURES = ["neighbourhood", "room_type", "property_type", "accommodates",
#             "bathrooms_text", "bedrooms", "beds"
#             # , "days_from_today"
#             ]
# TARGET = ["available"]

# def encode_value(feature, value):
#     """
#     Encodes a categorical value using its respective LabelEncoder.
#     If the value is not found, it assigns a default encoding of 0.
#     """
#     encoder = label_encoders.get(feature)
#     if encoder and value in encoder.classes_:
#         return encoder.transform([value])[0]
    # return 0  # Default encoding if value isn't in encoder classes
# Route for prediction
@property_bp.route('/availability', methods=['POST'])
# def predict():
#     # Get input data from the user (e.g., future dates)
#     data = request.get_json()
#     list_ID = data.get("list_ID")  # Property listing ID
#     dates = data.get("dates")  # Future dates for prediction
#     # start_date = data.get("dates").get("start")  # Start date
#     # end_date = data.get("dates").get("end")      # End date
#     print('list_ID',list_ID,'dates',dates)
#     # Sample list of dates
#     # dates = ['2024-05-01', '2024-05-02', '2024-05-03']
    
#     # Load the appropriate model
#     model = load_model(list_ID)
    
#     # Prepare the input data (for simplicity, assuming it's a list of dates)
#     future_dates = pd.DataFrame(dates, columns=['ds'])
    
#     # Make predictions
#     forecast = model.predict(future_dates)
    
#     # Get the predicted probabilities (yhat values)
#     # predictions = forecast[['ds', 'yhat']]

#     # Get the predicted probabilities (yhat values)
#     predictions = forecast[['ds', 'yhat']].copy() #Probability of occupancy
    
#     # Calculate the chance of availability (1 - occupancy probability)
#     predictions['availability_chance'] = 1 - predictions['yhat'] #Probability of availability
    
#     # Convert predictions to JSON format
#     predictions_json = predictions.to_dict(orient="records")
    
#     return jsonify(predictions_json)
# def predict():
#     # Get input data from the user (e.g., future dates)
#     data = request.get_json()
#     list_ID = data.get("list_ID")  # Property listing ID
#     dates = data.get("dates")  # Future dates for prediction
    
#     # Load the appropriate model
#     model = load_model(list_ID)
    
#     # Prepare the input data (assuming it's a list of dates)
#     future_dates = pd.DataFrame(dates, columns=['ds'])
    
#     # Make predictions
#     forecast = model.predict(future_dates)
    
#     # Get the predicted probabilities (yhat values)
#     predictions = forecast[['ds', 'yhat']].copy()  # Probability of occupancy
    
#     # Apply logistic scaling to yhat to squash values into the [0, 1] range
#     predictions['yhat'] = 1 / (1 + np.exp(-predictions['yhat']))
    
#     # Calculate the chance of availability as 1 - yhat
#     predictions['availability_chance'] = 1 - predictions['yhat']
    
#     # Define availability categories based on scaled yhat values
#     def availability_status(row):
#         if row['yhat'] < 0.3:
#             return "High Availability"
#         elif 0.3 <= row['yhat'] <= 0.7:
#             return "Moderate Availability"
#         else:
#             return "High Occupancy"
    
#     # Apply the availability status function to each row
#     predictions['availability_status'] = predictions.apply(availability_status, axis=1)
    
#     # Convert predictions to JSON format
#     predictions_json = predictions.to_dict(orient="records")
    
#     return jsonify(predictions_json)
# def predict():
#     try:
#         # Hardcoded values for testing (matching trained features)
#         data = {
#             "neighbourhood": "Molenbeek-Saint-Jean",
#             "room_type": "Entire home/apt",
#             "property_type": "Entire rental unit",
#             "accommodates": 5.0,
#             "bathrooms_text": "1 bath",
#             "bedrooms": 2.0,
#             "beds": 2.0,
#             # "days_from_today": 30
#         }
#         print('data',data)

#         # Convert input data into DataFrame
#         input_df = pd.DataFrame([data])

#         # Encode categorical features properly
#         for feature in ["neighbourhood", "room_type", "property_type", "bathrooms_text"]:
#             if feature in label_encoders:
#                 if data[feature] not in label_encoders[feature].classes_:
#                     # Add unseen values to encoder dynamically
#                     label_encoders[feature].classes_ = np.append(label_encoders[feature].classes_, data[feature])

#                 input_df[feature] = label_encoders[feature].transform([data[feature]])

#         # Scale numerical features
#         numerical_features = ["accommodates", "bedrooms", "beds"]
#         input_df[numerical_features] = scaler.transform(input_df[numerical_features])

#         # Ensure correct feature order before prediction
#         input_df = input_df[FEATURES]  # Matches the model's training order
#         print('input_def',input_df)

#         # Make Prediction
#         prediction = model.predict(input_df)

#         # Convert Output to Readable Format
#         predicted_availability = int(np.round(prediction[0][0]))  # Convert float to int (0 or 1)

#         return jsonify({
#             "predicted_availability": predicted_availability,
#             "used_data": data  # Shows hardcoded values in response
#         })

#     except Exception as e:
#         print("Error:", e)
#         return jsonify({"error": str(e)}), 500
# def predict():
#     try:
#         property_id=2354
#         # Extract year and month from request arguments
#         # year = request.args.get('year', type=int)
#         # month = request.args.get('month', type=int)
#         year=2025
#         month=5
#         if year is None or month is None:
#             return jsonify({"error": "Year and month are required parameters"}), 400

#         # Validate month range
#         if month < 0 or month > 11:
#             return jsonify({"error": "Invalid month value. It should be between 0 (January) and 11 (December)."}), 400

#         # Fetch the specific property details (Assume we retrieve from DB)
#         listing = ListingDetailed.query.filter_by(id=property_id).first()

#         if not listing:
#             return jsonify({"error": "Property not found"}), 404

#         # Extract property details
#         neighbourhood = listing.neighbourhood
#         room_type = listing.room_type
#         property_type = listing.property_type
#         accommodates = listing.accommodates
#         bathrooms_text = listing.bathrooms_text
#         bedrooms = listing.bedrooms
#         beds = listing.beds

#         # Encode categorical features
#         neighbourhood_encoded = encode_value("neighbourhood", neighbourhood)
#         room_type_encoded = encode_value("room_type", room_type)
#         property_type_encoded = encode_value("property_type", property_type)
#         bathrooms_text_encoded = encode_value("bathrooms_text", bathrooms_text)

#         predictions = []
#         start_date = datetime(year, month + 1, 1)  # Convert month index to actual month (1-12)

#         # Predict availability for the entire selected month
#         for day in range(1, 32):  # Maximum possible days in a month
#             try:
#                 prediction_date = start_date.replace(day=day)
#             except ValueError:
#                 break  # If the day is invalid (e.g., Feb 30), exit loop

#             # Prepare input features
#             input_features = np.array([
#                 neighbourhood_encoded, room_type_encoded, property_type_encoded,
#                 accommodates, bathrooms_text_encoded, bedrooms, beds, day
#             ]).reshape(1, -1)

#             # Scale the input
#             input_features_scaled = scaler.transform(input_features)

#             # Make prediction
#             prediction = model.predict(input_features_scaled)[0][0]

#             # Convert float output to binary availability (0 or 1)
#             predicted_availability = int(np.round(prediction))

#             # Store prediction with formatted date
#             date_str = prediction_date.strftime("%Y-%m-%d")
#             predictions.append({"date": date_str, "predicted_availability": predicted_availability})

#         return jsonify({"property_id": property_id, "predictions": predictions})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400
def predict():
    # try:
    #     # === Hardcoded test input ===
    #     sample_input = {
    #         "neighbourhood": "Molenbeek-Saint-Jean",
    #         "room_type": "Entire home/apt",
    #         "property_type": "Entire rental unit",
    #         "accommodates": 5.0,
    #         "bathrooms_text": "1 bath",
    #         "bedrooms": 2.0,
    #         "beds": 2.0,
    #         "date": "2022-09-01"
    #         # "days_from_today": 30
    #     }

    #     # Create DataFrame
    #     df = pd.DataFrame([sample_input])

    #     # Add days_from_today
    #     df["date"] = pd.to_datetime(df["date"])
    #     df["days_from_today"] = (df["date"] - pd.to_datetime(datetime.today())).dt.days
    #     df.drop(columns=["date"], inplace=True)

    #     # Label encode all categorical columns
    #     for col in categorical_cols:
    #         encoder = label_encoders[col]
    #         df[col] = encoder.transform(df[col])

    #     # Scale the subset of features the scaler was trained on
    #     scaled_data = scaler.transform(df[scaler_input_cols])

    #     # Replace original columns with scaled values
    #     df_scaled = df.copy()
    #     df_scaled[scaler_input_cols] = scaled_data

    #     # Ensure the column order matches what the model expects
    #     final_input = df_scaled[final_model_input_order].values

    #     # Predict
    #     raw_output = model.predict(final_input)[0][0]
    #     probability = 1 / (1 + math.exp(-raw_output))
    #     prediction = int(raw_output >= 0.5)

    #     return jsonify({
    #         "input": sample_input,
    #         "predicted_value": float(raw_output),
    #         "availability": prediction,
    #         "probability": round(probability, 4)
    #     })

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
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


# @property_bp.route('/calenderdates/<int:property_id>', methods=['GET'])
# def get_calenderDates(property_id):
#     try:
#         print("property_id",property_id)
#         # Query the database for the property with list_ID 2352
#         calender_dates = CalenderDates.query.filter_by(property_ID=property_id)()
#         print('calender dates',calender_dates)

#         if calender_dates:
#             # Convert the SQLAlchemy object to a dictionary
#             property_data = {
#                 "property_id": calender_dates.property_ID,
#                 "date": calender_dates.date,
#                 "availability": calender_dates.availability
#             }
#             return jsonify({"message": "Property calender data fetched successfully", "calender_dates": calender_dates}), 200
#         else:
#             return jsonify({"message": "No property calender data found"}), 404
#     except Exception as e:
#         # Log or print the error for debugging
#         print(f"Error fetching property calender data: {e}")
#         return jsonify({"message": "An error occurred while fetching property calender data"}), 500


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

