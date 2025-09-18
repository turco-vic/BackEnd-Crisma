CREATE DATABASE crisma;

\c crisma; 

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    year VARCHAR(4) NOT NULL,
    description TEXT, 
    coordinator_name VARCHAR(100), 
    coordinator_phone VARCHAR(20), 
    coordinator_email VARCHAR(100), 
    max_capacity INTEGER DEFAULT 30, 
    meeting_day VARCHAR(20), 
    meeting_time TIME, 
    classroom_location VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active', 
    start_date DATE, 
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crismandos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    cep VARCHAR(10) NOT NULL,
    road VARCHAR(100) NOT NULL,
    house_number VARCHAR(10) NOT NULL,
    complement VARCHAR(50),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    instagram VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    responsible_person VARCHAR(100) NOT NULL,
    responsible_person_phone VARCHAR(20) NOT NULL,
    baptismal_certificate VARCHAR(255) NOT NULL, 
    certificate_first_communion VARCHAR(255) NOT NULL, 
    rg VARCHAR(20) NOT NULL,
    profile_photo VARCHAR(255), 
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active',
    turma_id INTEGER NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banner_carrocel (
    id SERIAL PRIMARY KEY,
    day_time_start DATE NOT NULL,
    day_time_end DATE NOT NULL,
    title VARCHAR(100) NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    localization VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    about_event TEXT NOT NULL,
    location VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO turmas (name, year, description, coordinator_name, meeting_day, meeting_time, max_capacity) VALUES 
    ('Turma São Francisco', '2024', 'Turma de crisma com foco na espiritualidade franciscana', 'Padre João Silva', 'Sábado', '14:00:00', 25),
    ('Turma Santa Clara', '2024', 'Turma de crisma inspirada em Santa Clara de Assis', 'Catequista Maria Santos', 'Domingo', '15:30:00', 30),
    ('Turma São José', '2024', 'Turma de crisma dedicada a São José', 'Diácono Pedro Costa', 'Sábado', '16:00:00', 20);

CREATE TABLE encontros (
    id SERIAL PRIMARY KEY,
    turma_id INTEGER NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    numero_encontro INTEGER NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    data_encontro DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    local VARCHAR(100),
    status VARCHAR(20) DEFAULT 'agendado',
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(turma_id, numero_encontro)
);

CREATE TABLE presencas (
    id SERIAL PRIMARY KEY,
    crismando_id INTEGER NOT NULL REFERENCES crismandos(id) ON DELETE CASCADE,
    encontro_id INTEGER NOT NULL REFERENCES encontros(id) ON DELETE CASCADE,
    presente BOOLEAN DEFAULT FALSE,
    justificativa TEXT,
    observacoes TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(crismando_id, encontro_id)
);

INSERT INTO crismandos (name, surname, email, password, phone_number, turma_id) VALUES 
    ('João', 'Silva', 'joao.silva@email.com', 'senha123', '(11) 99999-1111', 1),
    ('Maria', 'Santos', 'maria.santos@email.com', 'senha456', '(11) 99999-2222', 1),
    ('Pedro', 'Costa', 'pedro.costa@email.com', 'senha789', '(11) 99999-3333', 2);

INSERT INTO encontros (turma_id, numero_encontro, titulo, descricao, data_encontro, horario_inicio, horario_fim, local) VALUES 
    (1, 1, 'Apresentação e Acolhida', 'Primeiro encontro com apresentação dos crismandos e explicação do processo de crisma', '2024-03-02', '14:00:00', '15:30:00', 'Turma 1'),
    (1, 2, 'A História da Salvação', 'Estudo sobre a história da salvação na Bíblia', '2024-03-09', '14:00:00', '15:30:00', 'Turma 1'),
    (1, 3, 'Os Sacramentos da Igreja', 'Estudo aprofundado sobre os sete sacramentos', '2024-03-16', '14:00:00', '15:30:00', 'Turma 1'),
    (2, 1, 'Apresentação e Acolhida', 'Primeiro encontro com apresentação dos crismandos', '2024-03-03', '15:30:00', '17:00:00', 'Turma 2'),
    (2, 2, 'A Oração na Vida Cristã', 'Importância da oração e diferentes formas de rezar', '2024-03-10', '15:30:00', '17:00:00', 'Turma 2');
