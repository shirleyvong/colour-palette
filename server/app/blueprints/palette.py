from flask import Blueprint, request, current_app
from app.colour_quantization import get_colour_palette
from app.libquantize import quantize
from PIL import Image

palette = Blueprint('palette', __name__)

@palette.route('', methods=['POST'])
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