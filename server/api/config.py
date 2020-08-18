import os

class Config(object):
  SECRET_KEY = os.getenv('SECRET_KEY')
  POSTGRES_URL = os.getenv('POSTGRES_URL')
  POSTGRES_USER = os.getenv('POSTGRES_USER')
  POSTGRES_PW = os.getenv('POSTGRES_PW')
  POSTGRES_DB = os.getenv('POSTGRES_DB')
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
  SQLALCHEMY_TRACK_MODIFICATIONS = False

  # Config for uploading images
  MAX_CONTENT_LENGTH = 1 * 1000000 # in MB
  UPLOAD_EXTENSIONS = ['jpg', 'png', 'jpeg']