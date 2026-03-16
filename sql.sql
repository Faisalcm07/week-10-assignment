CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie TEXT NOT NULL,
    director TEXT,
    description TEXT,
    image TEXT
);

INSERT INTO movies (movie, director, description, image)
VALUES
('Frankenstein 2025', 'Guillermo del Toro', 'A new adaptation of Mary Shelley’s Frankenstein.', 'https://cdn.moviefone.com/image-assets/1062722/g4JtvGlQO7DByTI6frUobqvSL3R.jpg?d=360x540&q=80'),
('Shutter Island', 'Martin Scorsese', 'A U.S. marshal investigates a disappearance at a mental hospital on an isolated island.', 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p3531967_p_v13_an.jpg'),
('Batman Begins', 'Christopher Nolan', 'Bruce Wayne trains to become Batman and fight crime in Gotham.', 'https://m.media-amazon.com/images/I/61ub6XgFmXL._AC_UF894,1000_QL80_.jpg'),
('Shrek 2', 'Andrew Adamson and Kelly Asbury', 'Shrek and Fiona visit the Kingdom of Far Far Away to meet her parents.', 'https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF894,1000_QL80_.jpg');

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  movie_id INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    clerk_id TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    bio TEXT,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE comments ADD COLUMN clerk_id TEXT REFERENCES users(clerk_id);

ALTER TABLE movies ADD COLUMN clerk_id TEXT REFERENCES users(clerk_id);