CREATE TABLE IF NOT EXISTS book (
  id SERIAL PRIMARY KEY,
  title VARCHAR UNIQUE NOT NULL,
  author VARCHAR NOT NULL,
  genre VARCHAR(50) NOT NULL,
  release_date DATE NOT NULL,
  description VARCHAR NOT NULL,
  image_url VARCHAR NULL,
  rating_count INT NOT NULL,
  rating_sum INT NULL
);