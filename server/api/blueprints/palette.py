from flask import Blueprint, request, current_app as app
from PIL import Image
from sqlalchemy import inspect
from api.libquantize import quantize
from api.models import Palette, db, User
import json
import io
import base64

palette = Blueprint('palette', __name__)

def validate_image(file):
  img = Image.open(file)
  img_format = img.format.lower()
  return img_format in app.config['UPLOAD_EXTENSIONS']


@palette.route('/generate', methods=['POST'])
def create_palette():
  if 'file' not in request.files:
    return 'Request form data must contain "file"', 400

  file = request.files['file']
  if file.filename == '':
    return 'No file was selected', 400

  if not validate_image(file):
    return 'File extension must be' + ','.join(app.config['UPLOAD_EXTENSIONS']), 400

  img = Image.open(file)

  # reduce image size if needed
  if img.height > 100 and img.height > img.width:
    reduce_factor = img.height / 100
    img = img.reduce(int(reduce_factor))
  elif img.width > 100 and img.width > img.height:
    reduce_factor = img.width / 100
    img = img.reduce(int(reduce_factor))

  pixels = []
  for p in list(img.getdata()):
    pixels.append({
      'red': p[0],
      'green': p[1],
      'blue': p[2],
    })

  num_colours = 5
  rgb_values = quantize(pixels, num_colours)

  # convert dict with rgb values to hex
  hex_values = ['#%02x%02x%02x' % (val['red'], val['green'], val['blue']) for val in rgb_values]

  return {
    'colours': hex_values,
  }


@palette.route('')
def get_palettes():
  try: 
    palettes = Palette.query.all()

    results = []
    for p in palettes:
      results.append({
      'id': p.id,
      'user_id': p.user_id,
      'colours': ['#{}'.format(colour) for colour in p.colours],
    })

    return { 'palettes': results }
  except Exception as e:
    app.logger.info(e)
    return 'Something unexpected happened, try again later', 500



@palette.route('', methods=['POST'])
def save_palette():
  if 'file' not in request.files or 'colours' not in request.form:
    return 'Request form data must contain "file" and "colours"', 400

  file = request.files['file']
  if file.filename == '':
    return 'No file was selected', 400

  if not validate_image(file):
    return 'File extension must be' + ','.join(app.config['UPLOAD_EXTENSIONS']), 400

  auth_header = request.headers.get('Authorization')
  if auth_header and auth_header.lower().startswith('bearer '):
    auth_token = auth_header.split(' ')[1]
    if auth_token:
      try:
        result = User.decode_auth_token(auth_token)
        if not isinstance(result, str):
          user = User.query.filter_by(id=result).first()

          # reduce size of image
          img = Image.open(file)
          max_size = (600, 600)
          img.thumbnail(max_size)

          stream = io.BytesIO()
          img.save(stream, format="JPEG")
          img_as_bytes = stream.getvalue()

          colours = json.loads(request.form['colours'])
          colours = [c[1:] for c in colours if c[0] == '#']

          palette = Palette(colours=colours, image=img_as_bytes, user_id=user.id)
          db.session.add(palette)
          db.session.commit()

          return {
            'id': palette.id,
            'colours': ['#{}'.format(colour) for colour in palette.colours],
          }
        else:
          # invalid token
          return result, 401
      except Exception as e:
        app.logger.info(e)
        return 'Something unexpected happened, try again later', 500

  # invalid Authorization header
  return 'Request must contain Authorization header with a valid token', 401


@palette.route('/<id>', methods=['DELETE'])
def delete_palette(id):
  auth_header = request.headers.get('Authorization')
  if auth_header and auth_header.lower().startswith('bearer '):
    auth_token = auth_header.split(' ')[1]
    if auth_token:
      try:
        result = User.decode_auth_token(auth_token)
        if not isinstance(result, str):
          palette = Palette.query.get(id)
          user = User.query.get(palette.user_id)

          res = {
            'id': palette.id,
            'user_id': palette.user_id,
            'username': user.username
          }

          db.session.delete(palette)
          db.session.commit()

          return res, 200
        else:
          # invalid token
          return result, 401
      except Exception as e:
        app.logger.info(e)
        return 'Something unexpected happened, try again later', 500


@palette.route('/<palette_id>')
def get_palette(palette_id):
  try:
    palette = Palette.query.get(palette_id)
    user = User.query.get(palette.user_id)

    return {
      'id': palette.id,
      'user_id': palette.user_id,
      'username': user.username,
      'colours': ['#{}'.format(colour) for colour in palette.colours],
      'image': base64.b64encode(palette.image).decode('ascii'),
    }
  except Exception as e:
    app.logger.info(e)
    return 'Something unexpected happened, try again later', 500


# @palette.route('/users/<user_id>')
# def get_palettes_by_user_id(user_id):
#   try:
#     palettes = Palette.query.filter_by(user_id=user_id)

#     results = []
#     for p in palettes:
#       results.append({
#       'id': p.id,
#       'user_id': p.user_id,
#       'colours': ['#{}'.format(colour) for colour in p.colours],
#     })

#     return { 'palettes': results }
#   except Exception as e:
#     app.logger.info(e)
#     return 'Something unexpected happened, try again later', 500


@palette.route('/users/<username>')
def get_palettes_by_username(username):
  try:
    user = User.query.filter_by(username=username).first()
    palettes = Palette.query.filter_by(user_id=user.id)

    results = []
    for p in palettes:
      results.append({
      'id': p.id,
      'user_id': user.id,
      'username': user.username,
      'colours': ['#{}'.format(colour) for colour in p.colours],
    })

    return { 'palettes': results }
  except Exception as e:
    app.logger.info(e)
    return 'Something unexpected happened, try again later', 500