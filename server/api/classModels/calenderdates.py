from extensions import db

class CalenderDates(db.Model):
    __tablename__ = 'calender_dates'

    # Define columns
    table_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    property_ID = db.Column(db.Integer, nullable=False)  # Use db.String(45) for varchar(45)
    date = db.Column(db.Date, nullable=False)  # Use db.Date for date column
    availability = db.Column(db.Integer, nullable=False)  # Use db.Integer for tinyint(1)

