DROP DATABASE IF EXISTS earworm_report;
CREATE DATABASE earworm_report;

\c earworm_report;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  img_url TEXT,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  genre_id INT REFERENCES genres(id) ON DELETE SET NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  song_id INT REFERENCES songs(id) ON DELETE SET NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_body TEXT,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  song_id INT REFERENCES songs(id) ON DELETE SET NULL
);
