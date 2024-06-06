CREATE DATABASE user_db;
CREATE DATABASE history_db;

\c user_db
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

\c history_db
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event VARCHAR(50),
    userId INT,
    timestamp TIMESTAMP
);
