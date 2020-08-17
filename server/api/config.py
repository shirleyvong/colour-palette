import os

class Config(object):
  SECRET_KEY = os.getenv('SECRET_KEY')
  DEBUG = True
  POSTGRES_URL = '0.0.0.0:5432'
  POSTGRES_USER = 'secret'
  POSTGRES_PW = 'secret'
  POSTGRES_DB = 'quantize-app'
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
  SQLALCHEMY_TRACK_MODIFICATIONS = False

  # Config for uploading images
  MAX_CONTENT_LENGTH = 500000 # 500kb in bytes
  UPLOAD_EXTENSIONS = ['jpg', 'png', 'jpeg']