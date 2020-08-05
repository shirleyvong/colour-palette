from flask import Flask

def create_app():
  app = Flask(__name__, instance_relative_config=True)

  from app.blueprints.palette import palette
  app.register_blueprint(palette, url_prefix='/palette')

  return app