-- Up Migration
BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author INT NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (author) REFERENCES users(id)
);

COMMIT;

-- Down Migration

