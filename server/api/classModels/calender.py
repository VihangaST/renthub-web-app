from extensions import db
class Calender(db.Model):
    __tablename__ = 'calender'

    Table_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Date = db.Column(db.Date, nullable=False)
    Available = db.Column(db.Integer, nullable=False)
    Price = db.Column(db.Float, nullable=False)
    Adjusted_price = db.Column(db.Float, nullable=False)
    Listing_ID = db.Column(db.Integer, nullable=False)

