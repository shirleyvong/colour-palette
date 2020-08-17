from flask import Blueprint, request, current_app as app
from api.models import User, db, bcrypt, BlacklistedToken
import time

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
  body = request.get_json()
  if body is None:
    return 'Request body must be in JSON', 400
  if not body.get('username') or not body.get('password'):
    return 'Request body must contain username and password', 400

  try:
    user = User.query.filter_by(username=body['username']).first()
    if user:
      return 'Username already exists', 202
    
    new_user = User(username=body['username'], password=body['password'])
    db.session.add(new_user)
    db.session.commit()

    auth_token = new_user.encode_auth_token(new_user.id)

    return { 'auth_token': auth_token.decode() }, 201
  except Exception as e:
    app.logger.info(e)
    return 'Something unexpected happened, try again later', 500


@auth.route('/login', methods=['POST'])
def login():
  body = request.get_json()
  if body is None:
    return 'Request body must be in JSON', 400
  if not body.get('username') or not body.get('password'):
    return 'Request body must contain username and password', 400

  try:
    user = User.query.filter_by(username=body['username']).first()
    if user and bcrypt.check_password_hash(user.password, body['password']):
      auth_token = user.encode_auth_token(user.id)
      return { 'auth_token': auth_token.decode() }, 200

    return 'The username and password combination does not exist.', 404
  except Exception as e:
    app.logger.info(e)
    return 'Something unexpected happened, try again later', 500

@auth.route('/status')
def status():
  auth_header = request.headers.get('Authorization')
  if auth_header and auth_header.lower().startswith('bearer '):
    auth_token = auth_header.split(' ')[1]
    if auth_token:
      try:
        result = User.decode_auth_token(auth_token)
        if not isinstance(result, str):
          user = User.query.filter_by(id=result).first()
          return { 'id': user.id, 'username': user.username }, 200
        else:
          # invalid token
          return result, 401
      except Exception as e:
        app.logger.info(e)
        return 'Something unexpected happened, try again later', 500

  # invalid Authorization header
  return 'Request must contain Authorization header with a valid token', 401

@auth.route('/logout', methods=['POST'])
def logout():
  auth_header = request.headers.get('Authorization')
  if auth_header and auth_header.lower().startswith('bearer '):
    auth_token = auth_header.split(' ')[1]
    if auth_token:
      try:
        result = User.decode_auth_token(auth_token)
        if not isinstance(result, str):
          blacklisted_token = BlacklistedToken(token=auth_token)
          db.session.add(blacklisted_token)
          db.session.commit()

          return '', 200
        else:
          # invalid token
          return result, 401
      except Exception as e:
        app.logger.info(e)
        return 'Something unexpected happened, try again later', 500

  # invalid Authorization header
  return 'Request must contain Authorization header with a valid token', 401