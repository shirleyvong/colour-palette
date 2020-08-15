from flask import Blueprint, request, current_app
from PIL import Image
import json
from sqlalchemy import inspect
from api.libquantize import quantize
from api.models import Palette, db

palette = Blueprint('palette', __name__)

@palette.route('/generate', methods=['POST'])
def create_palette():
  if 'file' not in request.files:
    return 'Request form data must contain "file"', 400

  file = request.files['file']
  if file.filename == '':
    return 'No file was selected', 400

  # verify file format
  img = Image.open(file)
  img_format = img.format.lower()
  if img_format not in current_app.config['UPLOAD_EXTENSIONS']:
    return 'File extension must be' + ','.join(current_app.config['UPLOAD_EXTENSIONS']), 400

  # reduce image size 
  width = img.width;
  height = img.height;
  if height > width:
    reduce_factor = height / 100
  else: 
    reduce_factor = width / 100
  reduced_img = img.reduce(int(reduce_factor))

  pixels = []
  for p in list(reduced_img.getdata()):
    pixels.append({
      'red': p[0],
      'green': p[1],
      'blue': p[2],
    })

  num_colours = 5
  results = quantize(pixels, num_colours)

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
  colours = [c[1:] for c in body['colours'] if c[0] == '#']
  print(colours)
  palette = Palette(colours=colours)
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