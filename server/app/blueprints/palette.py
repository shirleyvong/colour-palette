from flask import Blueprint, request, current_app

palette = Blueprint('palette', __name__)

@palette.route('/')
def create_palette():
  return 'hello'