CREATE DATABASE crisma;

\c crisma; 

CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    founder VARCHAR(100) NOT NULL
);

CREATE TABLE crismandos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    cep NUMBER NOT NULL,
    road
    house_number VANCHAR NOT NULL,
    sala_id INTEGER NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    photo VARCHAR(255)
);

INSERT INTO salas (name, founder) VALUES 
    ('Grifinória', 'Godric Gryffindor'),
    ('Sonserina', 'Salazar Slytherin'),
    ('Corvinal', 'Rowena Ravenclaw'),
    ('Lufa-Lufa', 'Helga Hufflepuff');

INSERT INTO crismandos (name, sala_id) VALUES 
    ('Harry Potter', 1),
    ('Draco Malfoy', 2),
    ('Luna Lovegood', 3),
    ('Cedrico Diggory', 4);
