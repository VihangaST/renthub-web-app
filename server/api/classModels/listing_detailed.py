
from extensions import db

class ListingDetailed(db.Model):
    __tablename__ = 'listings_detailed'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    description = db.Column(db.Text, nullable=True)
    property_type = db.Column(db.Text, nullable=True)
    accommodates = db.Column(db.BigInteger, nullable=True)
    bathrooms_text = db.Column(db.Text, nullable=True)
    bedrooms = db.Column(db.BigInteger, nullable=True)
    beds = db.Column(db.BigInteger, nullable=True)
    amenities = db.Column(db.JSON, nullable=True)
    neighbourhood = db.Column(db.Text, nullable=True)
    room_type = db.Column(db.Text, nullable=True)

