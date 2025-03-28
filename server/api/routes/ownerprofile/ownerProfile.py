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

# @ownerProfile_bp.route('/updatepropertydetails', methods=['POST'])
# def update_user_details():
#     try:
#         if request.content_type != 'application/json':
#             return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415

#         # Parse the JSON body
#         data = request.get_json()

#         if not data:
#             return jsonify({"error": "Invalid JSON or empty body"}), 400

#         form_data = data
#         print('form_data',form_data)
#         # Accessing individual fields from the form data
#         availability_365 = form_data.get('availability_365')
#         host_ID = data.get('host_ID')
#         print(host_ID)
#         host_name = form_data.get('host_name')
#         latitude = form_data.get('latitude')
#         list_ID = form_data.get('list_ID')
#         list_name = data.get('list_name')
#         longitude = form_data.get('longitude')
#         minmum_nights = form_data.get('minmum_nights')
#         neighbourhood = form_data.get('neighbourhood')
#         number_of_reviews = form_data.get('number_of_reviews')
#         number_of_reviews_ltm = form_data.get('number_of_reviews_ltm')
#         price = form_data.get('price')
#         room_type = form_data.get('room_type')
#         description = form_data.get('description')
#         property_type = form_data.get('property_type')
#         accommodates = form_data.get('accommodates')
#         bathrooms_text = form_data.get('bathrooms_text')
#         bedrooms = form_data.get('bedrooms')
#         beds = form_data.get('beds')
#         amenities = form_data.get('amenities')
#         minimum_nights = form_data.get('minimum_nights')
#         maximum_nights = form_data.get('maximum_nights')

#         if not host_ID:
#             return jsonify({"error": "host_ID is required"}), 400

#         # Find the user in the database (Listing table)
#         user = Listing.query.filter_by(host_ID=host_ID, list_ID=list_ID).first()

#         # if not user:
#         #     # If user does not exist in Listing table, create a new entry
#         #     new_user = Listing(
#         #         list_ID=list_ID,
#         #         list_name=list_name,
#         #         host_ID=host_ID,
#         #         price=price,
#         #         room_type=room_type,
#         #         neighbourhood=neighbourhood,
#         #         longitude=longitude,
#         #         latitude=latitude,
#         #     )
#         #     db.session.add(new_user)
#         #     db.session.commit()

#         #     # Create a new entry in the ListingDetailed table
#         #     new_listing_detailed = ListingDetailed(
#         #         description=description,
#         #         property_type=property_type,
#         #         accommodates=accommodates,
#         #         bathrooms_text=bathrooms_text,
#         #         bedrooms=bedrooms,
#         #         beds=beds,
#         #         amenities=amenities,
    
#         #     )
#         #     db.session.add(new_listing_detailed)
#         #     db.session.commit()

#         #     return jsonify({"message": "New user and detailed info added successfully", "user_id": new_user.id}), 201

#         # If user exists in Listing table, update the existing record
#         user.price = price
#         user.room_type = room_type
#         user.neighbourhood = neighbourhood
#         user.longitude = longitude
#         user.latitude = latitude
#         user.list_name = list_name

#         # Find the user in ListingDetailed table
#         detailed_user = ListingDetailed.query.filter_by(id=list_ID).first()

#         # if not detailed_user:
#         #     # If no entry exists in ListingDetailed, create a new one
#         #     detailed_user = ListingDetailed(
#         #         description=description,
#         #         property_type=property_type,
#         #         accommodates=accommodates,
#         #         bathrooms_text=bathrooms_text,
#         #         bedrooms=bedrooms,
#         #         beds=beds,
#         #         amenities=amenities,
#         #     )
#         #     db.session.add(detailed_user)
#         # else:
#         #     # If entry exists, update the detailed record
#         #     detailed_user.description = description
#         #     detailed_user.property_type = property_type
#         #     detailed_user.accommodates = accommodates
#         #     detailed_user.bathrooms_text = bathrooms_text
#         #     detailed_user.bedrooms = bedrooms
#         #     detailed_user.beds = beds
#         #     detailed_user.amenities = amenities
# # If entry exists, update the detailed record
#         detailed_user.description = description
#         detailed_user.property_type = property_type
#         detailed_user.accommodates = accommodates
#         detailed_user.bathrooms_text = bathrooms_text
#         detailed_user.bedrooms = bedrooms
#         detailed_user.beds = beds
#         detailed_user.amenities = amenities
#         db.session.commit()

#         return jsonify({"message": "User and detailed info updated successfully"})

#     except Exception as e:
#         print(e)
#         return jsonify({"error": str(e)}), 500

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
