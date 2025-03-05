from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
from classModels.reviewRates import ReviewRate
from classModels.calenderdates import CalenderDates
from datetime import datetime
import joblib
import pandas as pd
import numpy as np
from extensions import db
from classModels.user import Users

ownerBookings_bp = Blueprint('ownerBookings_bp', __name__)

@ownerBookings_bp.route('/bookings/<int:user_id>', methods=['GET'])
def get_calenderDates(user_id):
    # try:
    #     print("user_id in calender dates", user_id)

    #     calender_dates = CalenderDates.query.filter_by(property_ID=2352).all()
    #     print('calender dates', calender_dates)
        
    #     if calender_dates:
    #         # Convert the SQLAlchemy objects to a list of dictionaries
    #         calender_dates_list = [
    #             {
    #                 "property_id": date_record.property_ID,
    #                 "date": date_record.date.strftime('%Y-%m-%d'),  # Format the date to string (optional)
    #                 "availability": date_record.availability,
    #                 "tenant_id":date_record.tenant_ID
    #             }
    #             for date_record in calender_dates
    #         ]
    #         print('calender dates list', calender_dates_list)
    #         return jsonify({"message": "Property calendar data fetched successfully", "calender_dates":calender_dates_list }), 200
    #     else:
    #         return jsonify({"message": "No property calendar data found"}), 404
    # except Exception as e:
    #     # Log or print the error for debugging
    #     print(f"Error fetching property calendar data: {e}")
    #     return jsonify({"message": "An error occurred while fetching property calendar data"}), 500

    try:
        print("user_id in calendar dates:", user_id)

        # Fetch all property_IDs where host_ID matches user_id
        properties = Listing.query.filter_by(host_ID=user_id).all()
        print("Properties:", properties)
        property_ids = [prop.list_ID for prop in properties]

        if not property_ids:
            return jsonify({"message": "No properties found for the given user"}), 404

        # Fetch calendar dates for the fetched property IDs
        calender_dates = CalenderDates.query.filter(CalenderDates.property_ID.in_(property_ids)).all()

        # Organize calendar dates by property_id
        # calender_dates_dict = {}
        # Organize calendar dates by property_id, ensuring all properties are included
        calender_dates_dict = {prop_id: [] for prop_id in property_ids}  # Initialize all properties with empty lists

        for date_record in calender_dates:
            property_id = date_record.property_ID

            # if property_id not in calender_dates_dict:
            #     calender_dates_dict[property_id] = []

            calender_dates_dict[property_id].append({
                "date": date_record.date.strftime('%Y-%m-%d'),
                "availability": date_record.availability,
                "tenant_id": date_record.tenant_ID
            })

        print("Calendar dates by property:", calender_dates_dict)
        return jsonify({"message": "Property calendar data fetched successfully", "calender_dates": calender_dates_dict}), 200

    except Exception as e:
        print(f"Error fetching property calendar data: {e}")
        return jsonify({"message": "An error occurred while fetching property calendar data"}), 500



@ownerBookings_bp.route('/tenant/<int:tenant_id>', methods=['GET'])
def get_tenant(tenant_id):
    try:
        tenant = Users.query.get(tenant_id)
        print("Tenant:", tenant)
        if tenant:
            return jsonify({
                "name": tenant.LoginName,
                "email": tenant.Email,
                "tel": tenant.PhoneNo,
                "hometown": tenant.HomeTown
            }), 200
        else:
            return jsonify({"message": "Tenant not found"}), 404
    except Exception as e:
        print(f"Error fetching tenant: {e}")
        return jsonify({"message": "An error occurred"}), 500