from extensions import db
class Users(db.Model):
    __tablename__ = 'loginusers'

    LoginId = db.Column(db.Integer, primary_key=True,autoincrement=True)
    LoginName = db.Column(db.String(50))
    Password = db.Column(db.String(512))
    ConfirmPassword = db.Column(db.String(255))
    UserRole = db.Column(db.String(50))
    RoleID = db.Column(db.Integer)
    PhoneNo = db.Column(db.String(10))
    Email = db.Column(db.String(45))
    HomeTown = db.Column(db.String(45))

def _repr_(self):
        return f'<LoginUser {self.LoginName}>'