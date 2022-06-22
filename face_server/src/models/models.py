from sqlalchemy_serializer import SerializerMixin

from src.database import db


class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(140))
    name = db.Column(db.String(256))
    password = db.Column(db.String(512))
