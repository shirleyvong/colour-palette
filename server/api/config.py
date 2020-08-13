class Config(object):
  DEBUG = True
  POSTGRES_URL = 'db:5432'
  POSTGRES_USER = 'secret'
  POSTGRES_PW = 'secret'
  POSTGRES_DB = 'quantize-app'
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
  SQLALCHEMY_TRACK_MODIFICATIONS = False