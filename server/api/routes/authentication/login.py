# login.py
from flask import Blueprint, request, current_app,jsonify
from classModels.user import Users
from cryptography.hazmat.primitives.asymmetric import padding
import base64
from cryptography.hazmat.primitives import hashes
import jwt
import datetime

import base64
from cryptography.hazmat.primitives import hashes

login_bp = Blueprint('login', __name__)
SECRET_KEY = 'procall'

@login_bp.route('/test')
def get_test_message():
    return jsonify("Hello there")

def decrypt_password(ciphertext, private_key):
    print('*cipher',ciphertext)
    try:
        print('*try ')
        decoded_ciphertext = base64.b64decode(ciphertext.encode('utf-8'))
        print('*decoded_ciphertext',decoded_ciphertext)
        plaintext = private_key.decrypt(
            decoded_ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        print(f"Decrypted Password: {plaintext.decode()}")
        return plaintext.decode()
    except Exception as e:
        print(f"Decryption failed: {e}")
        raise e


@login_bp.route('/login', methods=['POST'])
def authenticate():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        print('username',username,'password',password)
        # Secret key for encoding and decoding JWT
    
        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        # Query the database for the user
        loginuser = Users.query.filter_by(LoginName=username).first()
        
        # print('loginuser',loginuser.Password)
        if loginuser:
            try:
                print('loginuser.Password',loginuser.Password)
                print({current_app.private_key})

                if not current_app.private_key:
                    print("Private key is not initialized.")
                # Decrypt the stored password

                decrypted_password = decrypt_password(loginuser.Password, current_app.private_key)
                
                print('%decrypted_password',decrypted_password)

                if decrypted_password == password:
                    print("decrypted_password == password")
                # if  loginuser.Password == password:
                    # Create a token
                    # token = jwt.encode({
                    #     'userId': loginuser.LoginId,
                    #     'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                    # }, SECRET_KEY, algorithm='HS256')
                    # print('token')
                    token=6233
                    
                    return jsonify({"message": "Login successful", "user": {"userID": loginuser.LoginId},'token': token}), 200
                else:
                    return jsonify({"message": "Invalid username or password"}), 401
            except Exception as e:
                return jsonify({"message": "Error during decryption"}), 500
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print("Error during decryption - " + str(e))
        return jsonify({"message": "Error during login"}), 500

        
def validate_token(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return decoded_token['userId']
    except jwt.ExpiredSignatureError:
        # throw the exception to the caller
        raise jwt.ExpiredSignatureError("Token expired")
    except jwt.InvalidTokenError:
         # throw the exception to the caller
        raise jwt.InvalidTokenError("Invalid token")
    except Exception as e:
         # throw the exception to the caller
        raise e