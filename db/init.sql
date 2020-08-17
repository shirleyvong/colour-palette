CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS blacklisted_tokens (
  id SERIAL PRIMARY KEY,
  token varchar(500) NOT NULL,
  blacklisted_on timestamp NOT NULL,
  UNIQUE(token)
);

CREATE TABLE IF NOT EXISTS palettes (
  id SERIAL PRIMARY KEY,
  colours char(6) [] NOT NULL,
  image bytea NOT NULL,
  user_id INT NOT NULL REFERENCES users(id)
);