from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
from classModels.reviewRates import ReviewRate
from classModels.calenderdates import CalenderDates
import joblib
import pandas as pd
import numpy as np

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
def load_model(list_ID):
    # Load model for the given property listing ID
    model_filename = f"models/property_2354.pkl"
    model = joblib.load(model_filename)
    return model

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
def predict():
    # Get input data from the user (e.g., future dates)
    data = request.get_json()
    list_ID = data.get("list_ID")  # Property listing ID
    dates = data.get("dates")  # Future dates for prediction
    
    # Load the appropriate model
    model = load_model(list_ID)
    
    # Prepare the input data (assuming it's a list of dates)
    future_dates = pd.DataFrame(dates, columns=['ds'])
    
    # Make predictions
    forecast = model.predict(future_dates)
    
    # Get the predicted probabilities (yhat values)
    predictions = forecast[['ds', 'yhat']].copy()  # Probability of occupancy
    
    # Apply logistic scaling to yhat to squash values into the [0, 1] range
    predictions['yhat'] = 1 / (1 + np.exp(-predictions['yhat']))
    
    # Calculate the chance of availability as 1 - yhat
    predictions['availability_chance'] = 1 - predictions['yhat']
    
    # Define availability categories based on scaled yhat values
    def availability_status(row):
        if row['yhat'] < 0.3:
            return "High Availability"
        elif 0.3 <= row['yhat'] <= 0.7:
            return "Moderate Availability"
        else:
            return "High Occupancy"
    
    # Apply the availability status function to each row
    predictions['availability_status'] = predictions.apply(availability_status, axis=1)
    
    # Convert predictions to JSON format
    predictions_json = predictions.to_dict(orient="records")
    
    return jsonify(predictions_json)


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
                    "availability": date_record.availability
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
