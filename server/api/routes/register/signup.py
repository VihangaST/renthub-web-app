from flask import Blueprint, request, jsonify,current_app
from flask_cors import cross_origin
from classModels.user import Users
from extensions import db
import jwt
import pymysql
from ..authentication.login import validate_token
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
import base64
from sqlalchemy import func

signup_bp = Blueprint('signup', __name__)

# Generate RSA keys
# private_key = rsa.generate_private_key(
#     public_exponent=65537,
#     key_size=2048, 
# )
# public_key = private_key.public_key()

# def encrypt_password(password, public_key):
#     ciphertext = public_key.encrypt(
#         password.encode('utf-8'),
#         padding.OAEP(
#             mgf=padding.MGF1(algorithm=hashes.SHA256()),
#             algorithm=hashes.SHA256(),
#             label=None
#         )
#     )
#     return base64.b64encode(ciphertext).decode('utf-8')


@signup_bp.route('/signup', methods=['POST'])
def signup():
    try:
        print('signup called')
        data = request.json
        username = data.get('username')
        password = data.get('password')
        confirmPassword = data.get('confirmPassword')
        roleID = data.get('userRole')
        roleName = 'Administrator' if roleID == '1' else 'User'
        phoneNo = data.get('phoneNumber')
        email = data.get('email')
        hometown = data.get('homeTown')

        print('data',data)

        # Check if user already exists
        existing_user = Users.query.filter_by(LoginName=username).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # Create new user
        new_user = Users(LoginName=username, Password=password,ConfirmPassword=password,RoleID=roleID,UserRole=roleName,PhoneNo=phoneNo,Email=email,HomeTown=hometown)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# @signup_bp.route('/signup', methods=['POST'])
# @cross_origin()
# def register():
#     try:
#         # token  = request.headers.get('Authorization')
#         # if not token:
#         #     return jsonify({"error": "Authorization token is missing"}), 401
#         # token = token.replace('Bearer ', '')
#         # user_id = validate_token(token)

#         data = request.get_json()
#         print('data',data)
#         username = data.get('username')
#         password = data.get('password')
#         confirmPassword=data.get('confirmPassword')
#         phoneNumber=data.get('phoneNumber')
#         roleID=data.get('userRole')
#         roleName = 'Administrator' if roleID == '1' else 'User'
#         # role_mapping = {
#         #     '1': 'Administrator',
#         #     '2': 'User'
#         # }
#         # roleName = role_mapping.get(roleID, '')

#         # subDepartment=data.get('subDepartment')
#         # email=data.get('email')
#         # userID=data.get('userRole')
        
#         # print('sinup.py file.....................',username,password)

#         if not username or not password:
#             return jsonify({"message": "Username and password are required"}), 400
        
#         if password != confirmPassword:
#             return jsonify({"message": "Password and confirm password do not match"}), 400
        
#         encrypted_password = encrypt_password(password, current_app.public_key)
#         newuser = Users(LoginName=username, Password=encrypted_password,ConfirmPassword=encrypted_password,RoleID=roleID,UserRole=roleName)
        
#         db.session.add(newuser)
#         db.session.commit()

#         return jsonify({"message": "User registered successfully"}), 201
#     # except jwt.ExpiredSignatureError:
#     #     # Token has expired
#     #     return jsonify({"error": "Token has expired. Please log in again."}), 401
#     # except jwt.InvalidTokenError:
#     #     # Token is invalid
#     #     return jsonify({"error": "Invalid token. Please log in again."}), 403
#     except Exception as e:
#         # Catch-all for other exceptions
#         return jsonify({"error": str(e)}), 500