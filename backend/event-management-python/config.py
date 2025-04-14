# config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/event_management'
    SQLALCHEMY_TRACK_MODIFICATIONS = False