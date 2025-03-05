# app.py
from flask import Flask
from flask_cors import CORS
from cryptography.hazmat.primitives import serialization
from config import Config
from extensions import db
# Import the login blueprint
from routes.authentication.login import login_bp
from routes.register.signup import signup_bp
from routes.property.property import property_bp
from routes.rentplaces.rentplaceslist import rentplaceslist_bp
from routes.userprofile.userProfile import userProfile_bp
from routes.ownerprofile.ownerProfile import ownerProfile_bp
from routes.ownerBookings.ownerBookings import ownerBookings_bp


def create_app():
    app = Flask(__name__)
    CORS(app)
   
    app.config.from_object(Config)
    db.init_app(app)

    # Load RSA keys
    with open(Config.PRIVATE_KEY_PATH, "rb") as key_file:
        app.private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
        )

    with open(Config.PUBLIC_KEY_PATH, "rb") as key_file:
        app.public_key = serialization.load_pem_public_key(
            key_file.read(),
        )

    # Register the login blueprint  
    app.register_blueprint(login_bp)
    app.register_blueprint(signup_bp)
    app.register_blueprint(property_bp)
    app.register_blueprint(rentplaceslist_bp)
    app.register_blueprint(userProfile_bp)
    app.register_blueprint(ownerProfile_bp)
    app.register_blueprint(ownerBookings_bp)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)