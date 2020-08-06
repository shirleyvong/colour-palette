from flask import Blueprint, request, current_app
from app.colour_quantization import get_colour_palette
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
  colour_palette = get_colour_palette(file)
  current_app.logger.info(colour_palette)

  # convert to dictionary
  result = []
  for colour in colour_palette:
    result.append({
      'red': colour[0],
      'green': colour[1],
      'blue': colour[2],
    })

  return {
    'colours': result
  }