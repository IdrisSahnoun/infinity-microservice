# config.py
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/plans'
    SQLALCHEMY_TRACK_MODIFICATIONS = False