from extensions import db

class Listing(db.Model):
    __tablename__ = 'listings'

    # Define columns
    table_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    list_ID = db.Column(db.Integer, nullable=True)
    list_name = db.Column(db.String(90), nullable=True)
    host_ID = db.Column(db.Integer, nullable=False)
    host_name = db.Column(db.String(45), nullable=False)
    neighbourhood = db.Column(db.String(45), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    room_type = db.Column(db.String(45), nullable=True)
    price = db.Column(db.Float, nullable=True)
    minmum_nights = db.Column(db.Integer, nullable=True)
    number_of_reviews = db.Column(db.Integer, nullable=True)
    availability_365 = db.Column(db.Integer, nullable=True)
    number_of_reviews_ltm = db.Column(db.Integer, nullable=True)

