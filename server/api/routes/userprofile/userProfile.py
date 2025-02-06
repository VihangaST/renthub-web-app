from flask import Blueprint, jsonify, request, current_app
from classModels.listings import Listing
import joblib
import pandas as pd
import numpy as np
from classModels.user import Users
from extensions import db

userProfile_bp = Blueprint('userprofile', __name__)
@userProfile_bp.route('/userprofile')
def get_test_message():
    return jsonify("Hello there rentplaceslist")

@userProfile_bp.route('/loginuserdetails', methods=['POST'])
def get_user_details():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415

        # Parse the JSON body
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON or empty body"}), 400

        username = data.get('username')
        if not username:
            return jsonify({"error": "Username is required"}), 400

        # Simulate fetching user data from a database
        # user = {"LoginId": 1, "LoginName": "testuser", "UserRole": "Admin", "RoleID": 2}  # Mock data
        loginuser = Users.query.filter_by(LoginName=username).first()
        if loginuser:
            # Serialize the user object to a dictionary
            user_details = {
                "LoginId": loginuser.LoginId,
                "LoginName": loginuser.LoginName,
                "UserRole": loginuser.UserRole,
                "RoleID": loginuser.RoleID,
                "PhoneNo": loginuser.PhoneNo,
                "Email": loginuser.Email,
                "HomeTown": loginuser.HomeTown
            }
            return jsonify(user_details), 200        
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@userProfile_bp.route('/updateuserdetails', methods=['POST'])
def update_user_details():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type: Content-Type must be 'application/json'"}), 415

        # Parse the JSON body
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON or empty body"}), 400

        username = data.get('username')
        phone_no = data.get('PhoneNo')
        email = data.get('Email')
        home_town = data.get('HomeTown')

        if not username:
            return jsonify({"error": "Username is required"}), 400

        # Validate input fields
        if not phone_no and not email and not home_town:
            return jsonify({"error": "At least one field (PhoneNo, Email, HomeTown) must be provided"}), 400

        # Find the user in the database
        user = Users.query.filter_by(LoginName=username).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Update user details
        if phone_no:
            user.PhoneNo = phone_no
        if email:
            user.Email = email
        if home_town:
            user.HomeTown = home_town

        # Commit the changes to the database
        db.session.commit()

        return jsonify({"message": "User details updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500