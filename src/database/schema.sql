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
    profile_photo VARCHAR(255) NOT NULL, 
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

INSERT INTO turmas (name, year, description, coordinator_name, coordinator_phone, coordinator_email, meeting_day, meeting_time, max_capacity, classroom_location, start_date, end_date) VALUES 
    ('Turma São Francisco', '2024', 'Turma de crisma com foco na espiritualidade franciscana', 'Padre João Silva', '(11) 3456-7890', 'joao.silva@paroquia.com', 'Sábado', '14:00:00', 25, 'Sala 1 - Catequese', '2024-02-10', '2024-11-30'),
    ('Turma Santa Clara', '2024', 'Turma de crisma inspirada em Santa Clara de Assis', 'Catequista Maria Santos', '(11) 9876-5432', 'maria.santos@paroquia.com', 'Domingo', '15:30:00', 30, 'Sala 2 - Catequese', '2024-02-11', '2024-12-01'),
    ('Turma São José', '2024', 'Turma de crisma dedicada a São José', 'Diácono Pedro Costa', '(11) 2345-6789', 'pedro.costa@paroquia.com', 'Sábado', '16:00:00', 20, 'Sala 3 - Catequese', '2024-02-10', '2024-11-30'),
    ('Turma Santo Antônio', '2024', 'Turma focada nos ensinamentos de Santo Antônio de Pádua', 'Catequista Ana Rodrigues', '(11) 8765-4321', 'ana.rodrigues@paroquia.com', 'Domingo', '08:30:00', 28, 'Sala 4 - Catequese', '2024-02-11', '2024-12-01'),
    ('Turma São Paulo', '2024', 'Turma baseada nos ensinamentos do Apóstolo Paulo', 'Padre Carlos Mendes', '(11) 5432-1098', 'carlos.mendes@paroquia.com', 'Sábado', '09:00:00', 35, 'Salão Paroquial', '2024-02-10', '2024-11-30');

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

INSERT INTO banner_carrocel (day_time_start, day_time_end, title, time_start, time_end, localization, image_url, about_event, location, address) VALUES 
    ('2024-04-15', '2024-04-15', 'Celebração da Crisma 2024', '19:00:00', '21:00:00', 'Igreja Matriz São João', 'https://exemplo.com/crisma2024.jpg', 'Celebração solene do Sacramento da Crisma para os jovens que concluíram o processo de preparação. Será presidida pelo Bispo Diocesano Dom Alberto Santos.', 'Igreja Matriz', 'Rua da Igreja, 100 - Centro, São Paulo - SP'),
    ('2024-03-20', '2024-03-20', 'Retiro Espiritual dos Crismandos', '08:00:00', '17:00:00', 'Casa de Retiro São Francisco', 'https://exemplo.com/retiro2024.jpg', 'Dia de retiro espiritual para aprofundamento da fé e preparação final para a Crisma. Inclui palestras, dinâmicas, oração e confissões.', 'Casa de Retiro', 'Estrada da Serra, Km 15 - Zona Rural, São Paulo - SP'),
    ('2024-05-01', '2024-05-01', 'Missa de Ação de Graças', '10:00:00', '11:30:00', 'Igreja Matriz São João', 'https://exemplo.com/acao_gracas.jpg', 'Missa especial de ação de graças pelos crismandos e suas famílias. Momento de celebração e agradecimento pela conclusão do processo de crisma.', 'Igreja Matriz', 'Rua da Igreja, 100 - Centro, São Paulo - SP'),
    ('2024-02-25', '2024-02-25', 'Encontro de Pais e Responsáveis', '15:00:00', '17:00:00', 'Salão Paroquial', 'https://exemplo.com/encontro_pais.jpg', 'Encontro informativo para pais e responsáveis sobre o processo de crisma, cronograma de atividades e como apoiar os jovens nesta caminhada de fé.', 'Salão Paroquial', 'Rua da Igreja, 100 - Centro, São Paulo - SP'),
    ('2024-06-15', '2024-06-15', 'Festa Junina Paroquial', '18:00:00', '22:00:00', 'Quadra Coberta da Paróquia', 'https://exemplo.com/festa_junina.jpg', 'Festa junina da paróquia com participação especial dos crismandos na organização e apresentações. Comidas típicas, quadrilha e muito forró!', 'Quadra Paroquial', 'Rua da Igreja, 100 - Centro, São Paulo - SP');

INSERT INTO presencas (crismando_id, encontro_id, presente, justificativa, observacoes) VALUES 
    (1, 1, TRUE, NULL, 'Participou ativamente das dinâmicas'),
    (2, 1, TRUE, NULL, 'Muito interessada no conteúdo'),
    (1, 2, FALSE, 'Viagem em família', 'Justificativa aceita - família avisou com antecedência'),
    (3, 1, TRUE, NULL, 'Fez boas perguntas durante o encontro'),
    (2, 2, TRUE, NULL, 'Ajudou na organização da sala');

INSERT INTO crismandos (name, surname, birthday, cep, road, house_number, complement, neighborhood, city, phone_number, instagram, email, password, responsible_person, responsible_person_phone, baptismal_certificate, certificate_first_communion, rg, profile_photo, turma_id) VALUES 
    ('João', 'Silva', '2005-03-15', '01234-567', 'Rua das Flores', '123', 'Apto 45', 'Centro', 'São Paulo', '(11) 99999-1111', '@joao_silva', 'joao.silva@email.com', '$2b$10$hash1', 'Maria Silva', '(11) 98888-1111', 'cert_batismo_joao.pdf', 'cert_comunhao_joao.pdf', '12.345.678-9', 'joao_profile.jpg', 1),
    ('Maria', 'Santos', '2004-07-22', '01234-568', 'Rua das Rosas', '456', NULL, 'Jardim Europa', 'São Paulo', '(11) 99999-2222', '@maria_santos', 'maria.santos@email.com', '$2b$10$hash2', 'José Santos', '(11) 98888-2222', 'cert_batismo_maria.pdf', 'cert_comunhao_maria.pdf', '23.456.789-0', 'maria_profile.jpg', 1),
    ('Pedro', 'Costa', '2005-11-10', '01234-569', 'Rua dos Cravos', '789', 'Casa', 'Vila Nova', 'São Paulo', '(11) 99999-3333', '@pedro_costa', 'pedro.costa@email.com', '$2b$10$hash3', 'Ana Costa', '(11) 98888-3333', 'cert_batismo_pedro.pdf', 'cert_comunhao_pedro.pdf', '34.567.890-1', 'pedro_profile.jpg', 2),
    ('Ana', 'Oliveira', '2004-12-05', '01234-570', 'Rua das Violetas', '101', 'Bloco B', 'Bela Vista', 'São Paulo', '(11) 99999-4444', '@ana_oliveira', 'ana.oliveira@email.com', '$2b$10$hash4', 'Carlos Oliveira', '(11) 98888-4444', 'cert_batismo_ana.pdf', 'cert_comunhao_ana.pdf', '45.678.901-2', 'ana_profile.jpg', 3),
    ('Lucas', 'Ferreira', '2005-08-18', '01234-571', 'Rua dos Lírios', '202', NULL, 'Moema', 'São Paulo', '(11) 99999-5555', '@lucas_ferreira', 'lucas.ferreira@email.com', '$2b$10$hash5', 'Lucia Ferreira', '(11) 98888-5555', 'cert_batismo_lucas.pdf', 'cert_comunhao_lucas.pdf', '56.789.012-3', 'lucas_profile.jpg', 4);

INSERT INTO encontros (turma_id, numero_encontro, titulo, descricao, data_encontro, horario_inicio, horario_fim, local, status, observacoes) VALUES 
    (1, 1, 'Apresentação e Acolhida', 'Primeiro encontro com apresentação dos crismandos e explicação do processo de crisma. Dinâmica de conhecimento mútuo e entrega do cronograma.', '2024-03-02', '14:00:00', '15:30:00', 'Sala 1 - Catequese', 'realizado', 'Boa participação de todos os crismandos'),
    (2, 1, 'História da Salvação', 'Estudo sobre a história da salvação na Bíblia, desde a criação até Jesus Cristo. Trabalho em grupos sobre os patriarcas.', '2024-03-03', '15:30:00', '17:00:00', 'Sala 2 - Catequese', 'realizado', 'Apresentação muito boa dos grupos'),
    (3, 1, 'Os Sacramentos da Igreja', 'Estudo aprofundado sobre os sete sacramentos da Igreja Católica. Foco especial no sacramento da Crisma.', '2024-03-02', '16:00:00', '17:30:00', 'Sala 3 - Catequese', 'realizado', 'Muitas perguntas interessantes dos jovens'),
    (1, 2, 'A Oração na Vida Cristã', 'Importância da oração na vida do cristão. Diferentes tipos de oração: vocal, mental e contemplativa.', '2024-03-09', '14:00:00', '15:30:00', 'Sala 1 - Catequese', 'agendado', 'Trazer terço para oração prática'),
    (2, 2, 'Jesus Cristo - Verdadeiro Deus e Verdadeiro Homem', 'Estudo sobre a pessoa de Jesus Cristo, sua divindade e humanidade. Análise dos Evangelhos.', '2024-03-10', '15:30:00', '17:00:00', 'Sala 2 - Catequese', 'agendado', NULL);
