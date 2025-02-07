from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
import joblib
import pandas as pd
import numpy as np
from classModels.user import Users
from extensions import db

ownerProfile_bp = Blueprint('ownerprofile', __name__)
@ownerProfile_bp.route('/ownerprofile')
def get_test_message():
    return jsonify("Hello there rentplaceslist")

@ownerProfile_bp.route('/ownerproperties', methods=['POST'])
def get_user_details():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415

        # Parse the JSON body
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON or empty body"}), 400

        userID = data.get('userID')
        print(userID)
        if not userID:
            return jsonify({"error": "userID is required"}), 400

        # Simulate fetching user data from a database
        # user = {"LoginId": 1, "LoginName": "testuser", "UserRole": "Admin", "RoleID": 2}  # Mock data
        listings  = Listing.query.filter_by(host_ID=userID).all()
        if listings:
            user_properties = []
            for listing in listings:
                property_details = {
                    "list_ID": listing.list_ID,
                    "list_name": listing.list_name,
                    "host_ID": listing.host_ID,
                    "host_name": listing.host_name,
                    "neighbourhood": listing.neighbourhood,
                    "latitude": listing.latitude,
                    "longitude": listing.longitude,
                    "room_type": listing.room_type,
                    "price": listing.price,
                    "minmum_nights": listing.minmum_nights,
                    "number_of_reviews": listing.number_of_reviews,
                    "calculated_host_listings_count": listing.calculated_host_listings_count,
                    "availability_365": listing.availability_365,
                    "number_of_reviews_ltm": listing.number_of_reviews_ltm,
                }
                user_properties.append(property_details)
                
            
            return jsonify(user_properties), 200        
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ownerProfile_bp.route('/updateownerdetails', methods=['POST'])
def update_user_details():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415

        # Parse the JSON body
        data = request.get_json()
        print(data)

        if not data:
            return jsonify({"error": "Invalid JSON or empty body"}), 400

        # username = data.get('userID')
        # phone_no = data.get('PhoneNo')
        # email = data.get('Email')
        # home_town = data.get('HomeTown')

        data = request.get_json()
        form_data = data.get('formData', {})

# Accessing individual fields
        availability_365 = form_data.get('availability_365')
        calculated_host_listings_count = form_data.get('calculated_host_listings_count')
        host_ID = form_data.get('host_ID')
        host_name = form_data.get('host_name')
        latitude = form_data.get('latitude')
        list_ID = form_data.get('list_ID')
        list_name = form_data.get('list_name')
        longitude = form_data.get('longitude')
        minmum_nights = form_data.get('minmum_nights')
        neighbourhood = form_data.get('neighbourhood')
        number_of_reviews = form_data.get('number_of_reviews')
        number_of_reviews_ltm = form_data.get('number_of_reviews_ltm')
        price = form_data.get('price')
        room_type = form_data.get('room_type')
        if not host_ID:
            return jsonify({"error": "Username is required"}), 400

        # Validate input fields
        # if not phone_no and not email and not home_town:
        #     return jsonify({"error": "At least one field (PhoneNo, Email, HomeTown) must be provided"}), 400

        # Find the user in the database
        user = Listing.query.filter_by(host_ID = host_ID, list_ID=list_ID).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        user.price = price
        user.room_type = room_type
        user.neighbourhood = neighbourhood
        user.minmum_nights = minmum_nights
        user.longitude = longitude
        user.list_name = list_name
        user.latitude = latitude
        


        

        # Commit the changes to the database
        db.session.commit()

        return jsonify({"message": "User details updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500