from extensions import db
class ReviewDetailed(db.Model):
    __tablename__ = 'reviews_detailed'

    listing_id = db.Column(db.Integer, nullable=False)
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime, nullable=False)
    reviewer_id = db.Column(db.Integer, nullable=False)
    reviewer_name = db.Column(db.Text, nullable=False)
    reviews = db.Column(db.String(500), nullable=False)
