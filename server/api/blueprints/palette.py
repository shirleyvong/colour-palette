from flask import Blueprint, request, current_app
from PIL import Image
from sqlalchemy import inspect
from api.libquantize import quantize
from api.models import Palette, db
import json
import io
import base64

palette = Blueprint('palette', __name__)

def validate_image(file):
  img = Image.open(file)
  img_format = img.format.lower()
  return img_format in current_app.config['UPLOAD_EXTENSIONS']


@palette.route('/generate', methods=['POST'])
def create_palette():
  if 'file' not in request.files:
    return 'Request form data must contain "file"', 400

  file = request.files['file']
  if file.filename == '':
    return 'No file was selected', 400

  if not validate_image(file):
    return 'File extension must be' + ','.join(current_app.config['UPLOAD_EXTENSIONS']), 400

  # reduce image size 
  img = Image.open(file)
  if img.height > img.width:
    reduce_factor = img.height / 100
  else:
 reduced_img = img.reduce(int(reduce_factor))
   reduce_factor = img.width / 100
  
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
    'colours': results,
  }


@palette.route('')
def get_palettes():
  palettes = Palette.query.all()

  results = []
  for p in palettes:
    results.append({
    'id': p.id,
    'colours': ['#{}'.format(colour) for colour in p.colours],
  })

  return { 'palettes': results }


@palette.route('', methods=['POST'])
def save_palette():
  if 'file' not in request.files or 'colours' not in request.form:
    return 'Request form data must contain "file" and "colours"', 400

  file = request.files['file']
  if file.filename == '':
    return 'No file was selected', 400

  if not validate_image(file):
    return 'File extension must be' + ','.join(current_app.config['UPLOAD_EXTENSIONS']), 400

  # reduce size of image
  img = Image.open(file)
  max_size = (600, 600)
  img.thumbnail(max_size)

  stream = io.BytesIO()
  img.save(stream, format="JPEG")
  img_as_bytes = stream.getvalue()

  colours = json.loads(request.form['colours'])
  colours = [c[1:] for c in colours if c[0] == '#']

  palette = Palette(colours=colours, image=img_as_bytes)
  db.session.add(palette)
  db.session.commit()

  return {
    'id': palette.id,
    'colours': ['#{}'.format(colour) for colour in palette.colours],
  }

@palette.route('/<id>', methods=['DELETE'])
def delete_palette(id):
  Palette.query.filter_by(id=id).delete()
  db.session.commit()
  return ({}, 200)


@palette.route('/<id>')
def get_palette(id):
  palette = Palette.query.get(id)
  return {
    'id': palette.id,
    'colours': ['#{}'.format(colour) for colour in palette.colours],
    'image': base64.b64encode(palette.image).decode('ascii'),
  }