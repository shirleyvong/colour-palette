from flask import Flask, send_from_directory
from api.blueprints.palette import palette
from api.blueprints.auth import auth
from api.models import db, bcrypt
from api.config import Config

def create_app():
  app = Flask(__name__, static_folder='../build', static_url_path='/')

  app.config.from_object(Config)
  app.register_blueprint(palette, url_prefix='/api/palettes')
  app.register_blueprint(auth, url_prefix='/api/auth')
  db.init_app(app)
  bcrypt.init_app(app)

  @app.route('/', defaults={'path': ''})
  @app.route('/<path:path>')
  def index():
    return app.send_static_file('index.html')
    # return send_from_directory(app.static_folder, 'index.html')

  return app
