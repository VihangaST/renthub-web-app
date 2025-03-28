from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
import joblib
import pandas as pd
import numpy as np

rentplaceslist_bp = Blueprint('rentplaceslist', __name__)
@rentplaceslist_bp.route('/rentplaceslist_bp')
def get_test_message():
    return jsonify("Hello there rentplaceslist")

@rentplaceslist_bp.route('/rentplaceslist', methods=['GET'])
def get_rentplaces():
    try:
        # Fetch all rows from the Listing table
        properties = Listing.query.filter_by(host_ID=2582).limit(10).all()

        print('rentplaceslist', properties)

        if properties:
            # Convert the list of SQLAlchemy objects to a list of dictionaries
            properties_data = [
                {
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
                }
                for property in properties
            ]

            print('All properties:', properties_data)

            # Corrected variable name in the response
            return jsonify({"message": "Property data fetched successfully", "properties": properties_data}), 200
        else:
            # Handle the case where no properties are found
            return jsonify({"message": "No property data found"}), 404
    except Exception as e:
        # Log or print the error for debugging
        print(f"Error fetching property data: {e}")
        return jsonify({"message": "An error occurred while fetching property data"}), 500
