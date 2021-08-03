CREATE DATABASE nora


CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL UNIQUE,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        joined text NOT NULL,
        words INTEGER,
        streak INTEGER,
        email VARCHAR(255) UNIQUE,
        password TEXT NOT NULL
);
INSERT INTO users (first_name, last_name, email, password,joined,words,streak) VALUES ('Samet', 'Cimen', 'cimensamet338@gmail.comn', 'Samet123', '2021-01-25', 0, 0);