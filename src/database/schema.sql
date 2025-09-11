CREATE DATABASE crisma;

\c crisma; 

CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    founder VARCHAR(100) NOT NULL
);

CREATE TABLE crismandos (
    id SERIAL PRIMARY KEY,
    profile_photo VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    cep NUMBER NOT NULL,
    road VARCHAR(50) NOT NULL,
    house_number VARCHAR(10) NOT NULL,
    complement VARCHAR(50),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    instagram VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(30) NOT NULL,
    responsible_person VARCHAR(100),
    responsible_person_phone VARCHAR(20),
    baptismal_certificate VARCHAR(255),
    certificate_first_communion
    rg VARCHAR(255),
    sala_id INTEGER NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
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
