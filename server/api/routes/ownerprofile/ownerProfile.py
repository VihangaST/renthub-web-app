from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
import pandas as pd
import numpy as np
from classModels.user import Users
from classModels.listing_detailed import ListingDetailed
from classModels.reviewRates import ReviewRate
from extensions import db
import random
ownerProfile_bp = Blueprint('ownerprofile', __name__)

@ownerProfile_bp.route('/getownerpropertiesdetails', methods=['POST'])
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

        # Fetch listings based on userID
        listings = Listing.query.filter_by(host_ID=userID).all()
        if listings:
            user_properties = []
            for listing in listings:
                # Fetch detailed information for each listing
                listing_detailed = ListingDetailed.query.filter_by(id=listing.list_ID).first()

                # Prepare property details with additional fields
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
                    "availability_365": listing.availability_365,
                    "number_of_reviews_ltm": listing.number_of_reviews_ltm,
                }

                # If the detailed listing data exists, include it
                if listing_detailed:
                    property_details.update({
                        "description": listing_detailed.description,
                        "property_type": listing_detailed.property_type,
                        "accommodates": listing_detailed.accommodates,
                        "bathrooms_text": listing_detailed.bathrooms_text,
                        "bedrooms": listing_detailed.bedrooms,
                        "beds": listing_detailed.beds,
                        "amenities": listing_detailed.amenities,
                        "neighbourhood": listing_detailed.neighbourhood,
                        "room_type": listing_detailed.room_type,
                    })

                user_properties.append(property_details)
            return jsonify(user_properties), 200        
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ownerProfile_bp.route('/updatepropertydetails', methods=['POST'])
def update_or_add_property():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415
        # Parse JSON body
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or empty body"}), 400
        print('Received Data:', data)  # Debugging logs

        # Extract data fields
        host_ID = data.get('host_ID')
        list_ID = data.get('list_ID')  # This will be None for new properties
        list_name = data.get('list_name')
        price = data.get('price')
        room_type = data.get('room_type')
        neighbourhood = data.get('neighbourhood')
        longitude = data.get('longitude')
        latitude = data.get('latitude')
        description = data.get('description')
        property_type = data.get('property_type')
        accommodates = data.get('accommodates')
        bathrooms_text = data.get('bathrooms_text')
        bedrooms = data.get('bedrooms')
        beds = data.get('beds')
        amenities = data.get('amenities')
        host_name = data.get('host_name')

        # if not host_ID or not list_name or not price:
        #     return jsonify({"error": "host_ID, list_name, and price are required"}), 400

        # Check if updating an existing property
        if list_ID:
            # Fetch the existing property
            property_entry = Listing.query.filter_by(host_ID=host_ID, list_ID=list_ID).first()
            
            if not property_entry:
                return jsonify({"error": "Property not found"}), 404  # Return error if property does not exist
            
            # Update the existing property
            property_entry.list_name = list_name
            property_entry.price = price
            property_entry.room_type = room_type
            property_entry.neighbourhood = neighbourhood
            property_entry.longitude = longitude
            property_entry.latitude = latitude

            # Update or create ListingDetailed entry
            detailed_entry = ListingDetailed.query.filter_by(id=list_ID).first()
            if detailed_entry:
                detailed_entry.description = description
                detailed_entry.property_type = property_type
                detailed_entry.accommodates = accommodates
                detailed_entry.bathrooms_text = bathrooms_text
                detailed_entry.bedrooms = bedrooms
                detailed_entry.beds = beds
                detailed_entry.amenities = amenities
                detailed_entry.neighbourhood = neighbourhood
                detailed_entry.room_type = room_type
            else:
                new_detailed_entry = ListingDetailed(
                    id=list_ID,
                    description=description,
                    property_type=property_type,
                    accommodates=accommodates,
                    bathrooms_text=bathrooms_text,
                    bedrooms=bedrooms,
                    beds=beds,
                    amenities=amenities,
                    neighbourhood=neighbourhood,
                    room_type=room_type
                )
                db.session.add(new_detailed_entry)

            db.session.commit()
            return jsonify({"message": "Property updated successfully"}), 200

        else:
            # If list_ID is None, create a new property
            new_property = Listing(
                list_ID=random.randint(100000, 999999),  # Assign a temporary list_ID
                list_name=list_name,
                host_ID=host_ID,
                price=price,
                room_type=room_type,
                neighbourhood=neighbourhood,
                longitude=4522.55,
                latitude=2335.55,
                host_name=host_name,
                availability_365=65,
                number_of_reviews=12,
                minmum_nights=2,
                number_of_reviews_ltm=2,

            )
            db.session.add(new_property)
            db.session.commit()  # Commit to generate list_ID

            # Create a new entry in ListingDetailed
            new_detailed_entry = ListingDetailed(
                id=new_property.list_ID,  # Assign the newly generated list_ID
                description=description,
                property_type=property_type,
                accommodates=accommodates,
                bathrooms_text=bathrooms_text,
                bedrooms=bedrooms,
                beds=beds,
                amenities=amenities,
                neighbourhood=neighbourhood,
                room_type=room_type,
            )
            db.session.add(new_detailed_entry)
            db.session.commit()

            new_property_review_rates=ReviewRate(
                id=new_property.list_ID,
                review_scores_accuracy=0,
                review_scores_cleanliness=0,
                review_scores_checkin=0,
                review_scores_communication=0,
                review_scores_location=0,
                review_scores_value=0
            )   
            db.session.add(new_property_review_rates)
            db.session.commit()


            return jsonify({"message": "New property added successfully", "list_ID": new_property.list_ID}), 201

    except Exception as e:
        print("Error:", e)  # Log the error
        return jsonify({"error": str(e)}), 500
