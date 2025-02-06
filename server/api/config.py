from urllib.parse import quote_plus
import os
class Config:

    password = quote_plus('VSt@99')
    
    SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://root:{password}@localhost/renthub'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # BASE_DIR = os.path.dirname(os.path.abspath(_file_))
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    PRIVATE_KEY_PATH = os.path.join(BASE_DIR, 'authentication', 'private_key.pem')
    PUBLIC_KEY_PATH = os.path.join(BASE_DIR, 'authentication', 'public_key.pem')
