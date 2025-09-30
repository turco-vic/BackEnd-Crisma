CREATE DATABASE crisma;

\c crisma; 

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    year VARCHAR(4) NOT NULL,
    description TEXT, 
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
    rg VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255), 
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active',
    turma_id INTEGER REFERENCES turmas(id) ON DELETE CASCADE,
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

CREATE TABLE coordenadores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO turmas (
    name, year, description, meeting_day, meeting_time, classroom_location, status, start_date, end_date, created_at, updated_at
) VALUES
    ('Turma São Francisco', '2024', 'Turma de crisma com foco na espiritualidade franciscana', 'Sábado', '14:00:00', 'Sala 1', 'active', '2024-02-01', '2024-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Turma Santa Clara', '2024', 'Turma de crisma inspirada em Santa Clara de Assis', 'Domingo', '15:30:00', 'Sala 2', 'active', '2024-02-02', '2024-12-02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Turma São José', '2024', 'Turma de crisma dedicada a São José', 'Sábado', '16:00:00', 'Sala 3', 'active', '2024-02-03', '2024-12-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Turma Santa Rita', '2025', 'Turma de crisma dedicada a Santa Rita', 'Sábado', '10:00:00', 'Sala 4', 'active', '2025-02-01', '2025-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Turma São Paulo', '2025', 'Turma de crisma dedicada a São Paulo', 'Domingo', '09:00:00', 'Sala 5', 'active', '2025-02-02', '2025-12-02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO crismandos (
    name, surname, birthday, cep, road, house_number, complement, neighborhood, city, phone_number, instagram, email, password, responsible_person, responsible_person_phone, baptismal_certificate, certificate_first_communion, rg, profile_photo, enrollment_date, status, turma_id
) VALUES
    ('João', 'Silva', '2008-05-10', '01234-567', 'Rua das Flores', '123', 'Apto 1', 'Centro', 'São Paulo', '(11) 99999-1111', '@joaosilva', 'joao.silva@email.com', 'senha123', 'Carlos Silva', '(11) 98888-1111', 'cert_batismo_joao.pdf', 'cert_eucaristia_joao.pdf', '123456789', 'joao.png', '2024-02-01', 'active', 1),
    ('Beatriz', 'Almeida', '2008-07-12', '01234-568', 'Rua das Rosas', '124', 'Casa', 'Centro', 'São Paulo', '(11) 99999-1112', '@beatrizalmeida', 'beatriz.almeida@email.com', 'senha124', 'Sandra Almeida', '(11) 98888-1112', 'cert_batismo_beatriz.pdf', 'cert_eucaristia_beatriz.pdf', '123456790', 'beatriz.png', '2024-02-01', 'active', 1),
    ('Gabriel', 'Ribeiro', '2008-04-18', '01234-569', 'Rua das Violetas', '125', 'Apto 2', 'Centro', 'São Paulo', '(11) 99999-1113', '@gabrielribeiro', 'gabriel.ribeiro@email.com', 'senha125', 'Mario Ribeiro', '(11) 98888-1113', 'cert_batismo_gabriel.pdf', 'cert_eucaristia_gabriel.pdf', '123456791', 'gabriel.png', '2024-02-01', 'active', 1),
    ('Sofia', 'Martins', '2008-06-25', '01234-570', 'Rua das Orquídeas', '126', NULL, 'Centro', 'São Paulo', '(11) 99999-1114', '@sofiamartins', 'sofia.martins@email.com', 'senha126', 'Lucia Martins', '(11) 98888-1114', 'cert_batismo_sofia.pdf', 'cert_eucaristia_sofia.pdf', '123456792', 'sofia.png', '2024-02-01', 'active', 1),
    ('Rafael', 'Lima', '2008-03-14', '01234-571', 'Rua das Tulipas', '127', 'Casa', 'Centro', 'São Paulo', '(11) 99999-1115', '@rafaellima', 'rafael.lima@email.com', 'senha127', 'Jose Lima', '(11) 98888-1115', 'cert_batismo_rafael.pdf', 'cert_eucaristia_rafael.pdf', '123456793', 'rafael.png', '2024-02-01', 'active', 1),
    ('Isabella', 'Carvalho', '2008-08-30', '01234-572', 'Rua das Margaridas', '128', 'Apto 3', 'Centro', 'São Paulo', '(11) 99999-1116', '@isabellacarvalho', 'isabella.carvalho@email.com', 'senha128', 'Regina Carvalho', '(11) 98888-1116', 'cert_batismo_isabella.pdf', 'cert_eucaristia_isabella.pdf', '123456794', 'isabella.png', '2024-02-01', 'active', 1),

    ('Maria', 'Santos', '2007-09-15', '02345-678', 'Av. Brasil', '456', NULL, 'Jardim', 'Guarulhos', '(11) 99999-2222', '@mariasantos', 'maria.santos@email.com', 'senha456', 'Ana Santos', '(11) 98888-2222', 'cert_batismo_maria.pdf', 'cert_eucaristia_maria.pdf', '987654321', 'maria.png', '2024-02-02', 'active', 2),
    ('Thiago', 'Pereira', '2007-11-20', '02345-679', 'Av. Paulista', '457', 'Sala 101', 'Jardim', 'Guarulhos', '(11) 99999-2223', '@thiagopereira', 'thiago.pereira@email.com', 'senha457', 'Fernando Pereira', '(11) 98888-2223', 'cert_batismo_thiago.pdf', 'cert_eucaristia_thiago.pdf', '987654322', 'thiago.png', '2024-02-02', 'active', 2),
    ('Larissa', 'Gomes', '2007-10-08', '02345-680', 'Av. Independência', '458', NULL, 'Jardim', 'Guarulhos', '(11) 99999-2224', '@larissagomes', 'larissa.gomes@email.com', 'senha458', 'Patricia Gomes', '(11) 98888-2224', 'cert_batismo_larissa.pdf', 'cert_eucaristia_larissa.pdf', '987654323', 'larissa.png', '2024-02-02', 'active', 2),
    ('Henrique', 'Barbosa', '2007-12-03', '02345-681', 'Av. da Liberdade', '459', 'Casa', 'Jardim', 'Guarulhos', '(11) 99999-2225', '@henriquebarbosa', 'henrique.barbosa@email.com', 'senha459', 'Ricardo Barbosa', '(11) 98888-2225', 'cert_batismo_henrique.pdf', 'cert_eucaristia_henrique.pdf', '987654324', 'henrique.png', '2024-02-02', 'active', 2),
    ('Valentina', 'Rocha', '2007-08-17', '02345-682', 'Av. Santos Dumont', '460', 'Apto 201', 'Jardim', 'Guarulhos', '(11) 99999-2226', '@valentinarocha', 'valentina.rocha@email.com', 'senha460', 'Claudia Rocha', '(11) 98888-2226', 'cert_batismo_valentina.pdf', 'cert_eucaristia_valentina.pdf', '987654325', 'valentina.png', '2024-02-02', 'active', 2),
    ('Mateus', 'Dias', '2007-09-28', '02345-683', 'Av. Tiradentes', '461', NULL, 'Jardim', 'Guarulhos', '(11) 99999-2227', '@mateusdias', 'mateus.dias@email.com', 'senha461', 'Joana Dias', '(11) 98888-2227', 'cert_batismo_mateus.pdf', 'cert_eucaristia_mateus.pdf', '987654326', 'mateus.png', '2024-02-02', 'active', 2),

    ('Pedro', 'Costa', '2008-01-20', '03456-789', 'Rua Verde', '789', 'Casa', 'Vila Nova', 'Osasco', '(11) 99999-3333', '@pedrocosta', 'pedro.costa@email.com', 'senha789', 'Marcos Costa', '(11) 98888-3333', 'cert_batismo_pedro.pdf', 'cert_eucaristia_pedro.pdf', '192837465', 'pedro.png', '2024-02-03', 'active', 3),
    ('Camila', 'Nunes', '2008-02-14', '03456-790', 'Rua Amarela', '790', 'Apto 4', 'Vila Nova', 'Osasco', '(11) 99999-3334', '@camilanunes', 'camila.nunes@email.com', 'senha790', 'Helena Nunes', '(11) 98888-3334', 'cert_batismo_camila.pdf', 'cert_eucaristia_camila.pdf', '192837466', 'camila.png', '2024-02-03', 'active', 3),
    ('Diego', 'Moreira', '2008-01-05', '03456-791', 'Rua Vermelha', '791', 'Casa', 'Vila Nova', 'Osasco', '(11) 99999-3335', '@diegomoreira', 'diego.moreira@email.com', 'senha791', 'Antonio Moreira', '(11) 98888-3335', 'cert_batismo_diego.pdf', 'cert_eucaristia_diego.pdf', '192837467', 'diego.png', '2024-02-03', 'active', 3),
    ('Yasmin', 'Castro', '2008-03-09', '03456-792', 'Rua Rosa', '792', NULL, 'Vila Nova', 'Osasco', '(11) 99999-3336', '@yasmincastro', 'yasmin.castro@email.com', 'senha792', 'Fatima Castro', '(11) 98888-3336', 'cert_batismo_yasmin.pdf', 'cert_eucaristia_yasmin.pdf', '192837468', 'yasmin.png', '2024-02-03', 'active', 3),
    ('Vitor', 'Pinto', '2008-02-28', '03456-793', 'Rua Lilás', '793', 'Bloco A', 'Vila Nova', 'Osasco', '(11) 99999-3337', '@vitorpinto', 'vitor.pinto@email.com', 'senha793', 'Eduardo Pinto', '(11) 98888-3337', 'cert_batismo_vitor.pdf', 'cert_eucaristia_vitor.pdf', '192837469', 'vitor.png', '2024-02-03', 'active', 3),
    ('Manuela', 'Freitas', '2008-01-12', '03456-794', 'Rua Branca', '794', 'Casa', 'Vila Nova', 'Osasco', '(11) 99999-3338', '@manuelafreitas', 'manuela.freitas@email.com', 'senha794', 'Vanessa Freitas', '(11) 98888-3338', 'cert_batismo_manuela.pdf', 'cert_eucaristia_manuela.pdf', '192837470', 'manuela.png', '2024-02-03', 'active', 3),

    ('Ana', 'Oliveira', '2007-12-05', '04567-890', 'Rua Azul', '321', NULL, 'Bela Vista', 'São Paulo', '(11) 99999-4444', '@anaoliveira', 'ana.oliveira@email.com', 'senha101', 'Paula Oliveira', '(11) 98888-4444', 'cert_batismo_ana.pdf', 'cert_eucaristia_ana.pdf', '564738291', 'ana.png', '2024-02-04', 'active', 4),
    ('Bruno', 'Cardoso', '2007-11-18', '04567-891', 'Rua Violeta', '322', 'Apto 5', 'Bela Vista', 'São Paulo', '(11) 99999-4445', '@brunocardoso', 'bruno.cardoso@email.com', 'senha102', 'Sergio Cardoso', '(11) 98888-4445', 'cert_batismo_bruno.pdf', 'cert_eucaristia_bruno.pdf', '564738292', 'bruno.png', '2024-02-04', 'active', 4),
    ('Leticia', 'Monteiro', '2007-12-22', '04567-892', 'Rua Laranja', '323', 'Casa', 'Bela Vista', 'São Paulo', '(11) 99999-4446', '@leticiamonteiro', 'leticia.monteiro@email.com', 'senha103', 'Cristina Monteiro', '(11) 98888-4446', 'cert_batismo_leticia.pdf', 'cert_eucaristia_leticia.pdf', '564738293', 'leticia.png', '2024-02-04', 'active', 4),
    ('Gustavo', 'Teixeira', '2007-10-31', '04567-893', 'Rua Dourada', '324', NULL, 'Bela Vista', 'São Paulo', '(11) 99999-4447', '@gustavoteixeira', 'gustavo.teixeira@email.com', 'senha104', 'Marcelo Teixeira', '(11) 98888-4447', 'cert_batismo_gustavo.pdf', 'cert_eucaristia_gustavo.pdf', '564738294', 'gustavo.png', '2024-02-04', 'active', 4),
    ('Nicole', 'Mendes', '2007-11-07', '04567-894', 'Rua Prata', '325', 'Bloco C', 'Bela Vista', 'São Paulo', '(11) 99999-4448', '@nicolemendes', 'nicole.mendes@email.com', 'senha105', 'Adriana Mendes', '(11) 98888-4448', 'cert_batismo_nicole.pdf', 'cert_eucaristia_nicole.pdf', '564738295', 'nicole.png', '2024-02-04', 'active', 4),
    ('Arthur', 'Souza', '2007-12-13', '04567-895', 'Rua Bronze', '326', 'Casa', 'Bela Vista', 'São Paulo', '(11) 99999-4449', '@arthursouza', 'arthur.souza@email.com', 'senha106', 'Roberta Souza', '(11) 98888-4449', 'cert_batismo_arthur.pdf', 'cert_eucaristia_arthur.pdf', '564738296', 'arthur.png', '2024-02-04', 'active', 4),

    ('Lucas', 'Ferreira', '2008-03-22', '05678-901', 'Av. Central', '654', 'Bloco B', 'Centro', 'Barueri', '(11) 99999-5555', '@lucasferreira', 'lucas.ferreira@email.com', 'senha202', 'Roberto Ferreira', '(11) 98888-5555', 'cert_batismo_lucas.pdf', 'cert_eucaristia_lucas.pdf', '102938475', 'lucas.png', '2024-02-05', 'active', 5),
    ('Giovanna', 'Araujo', '2008-04-16', '05678-902', 'Av. Norte', '655', 'Apto 6', 'Centro', 'Barueri', '(11) 99999-5556', '@giovannaaraujo', 'giovanna.araujo@email.com', 'senha203', 'Marcia Araujo', '(11) 98888-5556', 'cert_batismo_giovanna.pdf', 'cert_eucaristia_giovanna.pdf', '102938476', 'giovanna.png', '2024-02-05', 'active', 5),
    ('Felipe', 'Vieira', '2008-05-28', '05678-903', 'Av. Sul', '656', NULL, 'Centro', 'Barueri', '(11) 99999-5557', '@felipevieira', 'felipe.vieira@email.com', 'senha204', 'Paulo Vieira', '(11) 98888-5557', 'cert_batismo_felipe.pdf', 'cert_eucaristia_felipe.pdf', '102938477', 'felipe.png', '2024-02-05', 'active', 5),
    ('Amanda', 'Ramos', '2008-03-11', '05678-904', 'Av. Leste', '657', 'Casa', 'Centro', 'Barueri', '(11) 99999-5558', '@amandaramos', 'amanda.ramos@email.com', 'senha205', 'Silvia Ramos', '(11) 98888-5558', 'cert_batismo_amanda.pdf', 'cert_eucaristia_amanda.pdf', '102938478', 'amanda.png', '2024-02-05', 'active', 5),
    ('Enzo', 'Correia', '2008-04-07', '05678-905', 'Av. Oeste', '658', 'Bloco D', 'Centro', 'Barueri', '(11) 99999-5559', '@enzocorreia', 'enzo.correia@email.com', 'senha206', 'Guilherme Correia', '(11) 98888-5559', 'cert_batismo_enzo.pdf', 'cert_eucaristia_enzo.pdf', '102938479', 'enzo.png', '2024-02-05', 'active', 5),
    ('Melissa', 'Torres', '2008-05-19', '05678-906', 'Av. Principal', '659', 'Apto 7', 'Centro', 'Barueri', '(11) 99999-5560', '@melissatorres', 'melissa.torres@email.com', 'senha207', 'Debora Torres', '(11) 98888-5560', 'cert_batismo_melissa.pdf', 'cert_eucaristia_melissa.pdf', '102938480', 'melissa.png', '2024-02-05', 'active', 5);

INSERT INTO encontros (
    turma_id, numero_encontro, titulo, descricao, data_encontro, horario_inicio, horario_fim, local, status, observacoes, created_at, updated_at
) VALUES
    (1, 1, 'Apresentação e Acolhida', 'Primeiro encontro com apresentação dos crismandos e explicação do processo de crisma', '2024-03-02', '14:00:00', '15:30:00', 'Sala 1', 'agendado', 'Nenhuma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 2, 'A História da Salvação', 'Estudo sobre a história da salvação na Bíblia', '2024-03-09', '14:00:00', '15:30:00', 'Sala 1', 'agendado', 'Nenhuma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 'Apresentação e Acolhida', 'Primeiro encontro com apresentação dos crismandos', '2024-03-03', '15:30:00', '17:00:00', 'Sala 2', 'agendado', 'Nenhuma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 2, 'A Oração na Vida Cristã', 'Importância da oração e diferentes formas de rezar', '2024-03-10', '15:30:00', '17:00:00', 'Sala 2', 'agendado', 'Nenhuma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, 'Encontro de Integração', 'Dinâmica de integração dos novos crismandos', '2024-03-17', '16:00:00', '17:30:00', 'Sala 3', 'agendado', 'Nenhuma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO banner_carrocel (
    day_time_start, day_time_end, title, time_start, time_end, localization, image_url, about_event, location, address, created_at, updated_at
) VALUES
    ('2024-04-01', '2024-04-02', 'Retiro Espiritual', '08:00:00', '18:00:00', 'Paróquia Central', 'retiro1.jpg', 'Retiro para aprofundamento espiritual', 'Salão Paroquial', 'Rua das Flores, 100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2024-05-10', '2024-05-11', 'Gincana Bíblica', '09:00:00', '17:00:00', 'Quadra', 'gincana.jpg', 'Gincana com atividades bíblicas', 'Quadra Poliesportiva', 'Av. Brasil, 200', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2024-06-15', '2024-06-16', 'Festa Junina', '15:00:00', '22:00:00', 'Paróquia Central', 'festa_junina.jpg', 'Festa junina com comidas típicas', 'Pátio', 'Rua Verde, 300', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2024-07-20', '2024-07-21', 'Encontro de Jovens', '10:00:00', '16:00:00', 'Salão Paroquial', 'encontro_jovens.jpg', 'Encontro para jovens crismandos', 'Salão Paroquial', 'Rua Azul, 400', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2024-08-05', '2024-08-06', 'Missa de Envio', '19:00:00', '21:00:00', 'Igreja Matriz', 'missa_envio.jpg', 'Celebração de envio dos crismandos', 'Igreja Matriz', 'Av. Central, 500', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO presencas (
    crismando_id, encontro_id, presente, justificativa, observacoes, data_registro
) VALUES
    (1, 1, TRUE, NULL, 'Participou normalmente', CURRENT_TIMESTAMP),
    (2, 1, FALSE, 'Estava doente', 'Faltou por motivo de saúde', CURRENT_TIMESTAMP),
    (3, 2, TRUE, NULL, 'Participou normalmente', CURRENT_TIMESTAMP),
    (4, 3, TRUE, NULL, 'Participou normalmente', CURRENT_TIMESTAMP),
    (5, 4, FALSE, 'Viagem', 'Faltou por viagem', CURRENT_TIMESTAMP);

    INSERT INTO coordenadores (
    nome, sobrenome, telefone, email, senha, foto_perfil, created_at, updated_at
) VALUES
    ('Enzo', 'Turcovic', '(11) 90000-0001', 'enzo.turcovic@exemplo.com', 'senha123', 'enzo.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Maria', 'Santos', '(11) 90000-0002', 'maria.santos@exemplo.com', 'senha456', 'maria.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pedro', 'Costa', '(11) 90000-0003', 'pedro.costa@exemplo.com', 'senha789', 'pedro.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ana', 'Oliveira', '(11) 90000-0004', 'ana.oliveira@exemplo.com', 'senha101', 'ana.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Lucas', 'Ferreira', '(11) 90000-0005', 'lucas.ferreira@exemplo.com', 'senha202', 'lucas.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
