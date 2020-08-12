from flask import Blueprint, request, current_app
from PIL import Image
import json
from sqlalchemy import inspect

from api.models import Palette, db;

palette = Blueprint('palette', __name__)

@palette.route('/generate', methods=['POST'])
def create_palette():
  if 'file' not in request.files:
    return 'request does not contain file part'
  
  file = request.files['file']
  if file.filename == '':
    return 'no file was selected'

  # TODO: validate image 
  current_app.logger.info(file.filename)

  im = Image.open(file)
  n = 5

  # rust method
  pixels = []
  for p in list(im.getdata()):
    pixels.append({
      'red': p[0],
      'green': p[1],
      'blue': p[2],
    })

  results = quantize(pixels, n)

  return {
    'colours': results
  }


@palette.route('')
def get_palettes():
  palettes = Palette.query.all()

  results = []
  for p in palettes:
    results.append(p.to_dict())

  return { 'palettes': results }


@palette.route('', methods=['POST'])
def save_palette():
  # if request.is_json():
  body = request.get_json()
  print(body)
  palette = Palette(colours=body['colours'])
  db.session.add(palette)
  db.session.commit()

  return palette.to_dict()


@palette.route('/<id>', methods=['DELETE'])
def delete_palette(id):
  Palette.query.filter_by(id=id).delete()
  db.session.commit()
  return ({ 'status': 200 }, 200)


@palette.route('/<id>')
def get_palette(id):
  palette = Palette.query.get(id)
  return palette.to_dict()