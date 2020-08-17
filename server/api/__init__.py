from flask import Flask
from api.blueprints.palette import palette
from api.models import db, bcrypt
from api.config import Config

def create_app():
  app = Flask(__name__, instance_relative_config=True)
  app.config.from_object(Config)
  app.register_blueprint(palette, url_prefix='/api/palettes')
  db.init_app(app)
  bcrypt.init_app(app)

  return app
