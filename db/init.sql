CREATE TABLE IF NOT EXISTS palettes (
  id SERIAL PRIMARY KEY,
  colours char(6) [] NOT NULL,
  image bytea NOT NULL
);
