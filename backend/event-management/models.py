from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Instance non initialisée

class Event(db.Model):
    __tablename__ = 'events'
    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    max_participants = db.Column(db.Integer, nullable=False)
    participants = db.relationship('Participant', backref='event', lazy=True)

class Participant(db.Model):
    __tablename__ = 'participants'
    participant_id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, nullable=False)
    member_name = db.Column(db.String(255), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)

class Member(db.Model):
    __tablename__ = 'members'
    member_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    role = db.Column(db.String(50), nullable=True, default="user")