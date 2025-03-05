from flask import Blueprint, jsonify, request, current_app
from datetime import datetime
import joblib
import pandas as pd
import numpy as np
from extensions import db
from classModels.calender import Calender
from classModels.listings import Listing

ownerPricePredictions_bp = Blueprint('ownerPricePredictions_bp', __name__)

@ownerPricePredictions_bp.route('/priceHistory/<int:user_id>', methods=['GET'])
def get_price_history(user_id=25):
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


