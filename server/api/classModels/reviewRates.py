from extensions import db

class ReviewRate(db.Model):
    __tablename__ = 'review_rates'

    id = db.Column(db.Integer, primary_key=True)
    review_scores_rating = db.Column(db.Float, nullable=False, default=0)
    review_scores_accuracy = db.Column(db.Float, nullable=False, default=0)
    review_scores_cleanliness = db.Column(db.Float, nullable=False, default=0)
    review_scores_checkin = db.Column(db.Float, nullable=False, default=0)
    review_scores_communication = db.Column(db.Float, nullable=False, default=0)
    review_scores_location = db.Column(db.Float, nullable=False, default=0)
    review_scores_value = db.Column(db.Float, nullable=False, default=0)
