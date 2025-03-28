from extensions import db
class Host_Detailed(db.Model):
    __tablename__ = 'host_detailed'

    host_ID = db.Column(db.Integer, primary_key=True)
    host_since = db.Column(db.Date)
    host_about = db.Column(db.String(300))
    host_location = db.Column(db.String(100))
    property_count = db.Column(db.Integer)
