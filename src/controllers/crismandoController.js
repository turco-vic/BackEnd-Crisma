const crismandoModel = require("../models/crismandoModel");

const getAllCrismandos = async (req, res) => {
    try {
        const crismandos = await crismandoModel.getCrismandos();
        res.json(crismandos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar crismandos!" });
    }
};

const getCrismandosByTurma = async (req, res) => {
    try {
        const { turma_id } = req.params;
        const crismandos = await crismandoModel.getCrismandosByTurma(turma_id);
        res.json(crismandos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar crismandos da turma!" });
    }
};

const getCrismando = async (req, res) => {
    try {
        const crismando = await crismandoModel.getCrismandoById(req.params.id);
        if (!crismando) {
            return res.status(404).json({ message: "Crismando não encontrado!" });
        }
        res.json(crismando);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar crismando!" });
    }
};

const createCrismando = async (req, res) => {
    try {
        // Validar TODOS os campos obrigatórios da tabela
        const camposObrigatorios = [
            'name', 'surname', 'birthday', 'cep', 'road', 'house_number',
            'neighborhood', 'city', 'phone_number', 'instagram', 'email', 
            'password', 'responsible_person', 'responsible_person_phone',
            'baptismal_certificate', 'certificate_first_communion', 'rg', 
            'profile_photo', 'turma_id'
        ];
        
        const camposFaltando = [];
        
        for (const campo of camposObrigatorios) {
            if (!req.body[campo] || req.body[campo] === '') {
                camposFaltando.push(campo);
            }
        }
        
        if (camposFaltando.length > 0) {
            return res.status(400).json({ 
                message: "Campos obrigatórios faltando", 
                campos_faltando: camposFaltando 
            });
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ 
                message: "Formato de email inválido" 
            });
        }
        
        // Validar formato de data (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(req.body.birthday)) {
            return res.status(400).json({ 
                message: "Formato de data inválido. Use YYYY-MM-DD" 
            });
        }
        
        // Validar se turma_id é um número
        if (isNaN(parseInt(req.body.turma_id))) {
            return res.status(400).json({ 
                message: "turma_id deve ser um número válido" 
            });
        }
        
        // Usar os dados enviados diretamente
        const crismandoData = {
            name: req.body.name,
            surname: req.body.surname,
            birthday: req.body.birthday,
            cep: req.body.cep,
            road: req.body.road,
            house_number: req.body.house_number,
            complement: req.body.complement || null, // Este pode ser opcional
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            phone_number: req.body.phone_number,
            instagram: req.body.instagram,
            email: req.body.email,
            password: req.body.password,
            responsible_person: req.body.responsible_person,
            responsible_person_phone: req.body.responsible_person_phone,
            baptismal_certificate: req.body.baptismal_certificate,
            certificate_first_communion: req.body.certificate_first_communion,
            rg: req.body.rg,
            profile_photo: req.body.profile_photo,
            turma_id: parseInt(req.body.turma_id)
        };
        
        const newCrismando = await crismandoModel.createCrismando(crismandoData);
        res.status(201).json(newCrismando);
    } catch (error) {
        // Verificar se é erro de email duplicado
        if (error.code === '23505' && error.constraint === 'crismandos_email_key') {
            return res.status(400).json({ 
                message: "Este email já está cadastrado!" 
            });
        }
        
        // Verificar se é erro de chave estrangeira (turma não existe)
        if (error.code === '23503' && error.constraint === 'crismandos_turma_id_fkey') {
            return res.status(400).json({ 
                message: "Turma informada não existe!" 
            });
        }
        
        res.status(500).json({ 
            message: "Erro ao criar crismando!", 
            error: error.message 
        });
    }
};

const updateCrismando = async (req, res) => {
    try {
        const { 
            name, 
            surname, 
            birthday, 
            cep,
            road,
            house_number,
            complement,
            neighborhood,
            city,
            phone_number, 
            instagram,
            email, 
            password,
            responsible_person,
            responsible_person_phone,
            baptismal_certificate,
            certificate_first_communion,
            rg,
            profile_photo,
            enrollment_date,
            status, 
            turma_id
        } = req.body;

        // Validação básica dos campos obrigatórios
        if (!name || !surname || !birthday || !cep || !road || !house_number || 
            !neighborhood || !city || !phone_number || !instagram || !email || 
            !password || !responsible_person || !responsible_person_phone || 
            !baptismal_certificate || !certificate_first_communion || !rg || 
            !profile_photo || !turma_id) {
            return res.status(400).json({ 
                message: "Campos obrigatórios faltando. Verifique todos os campos necessários conforme a documentação." 
            });
        }

        const crismandoData = {
            name, 
            surname, 
            birthday, 
            cep,
            road,
            house_number,
            complement,
            neighborhood,
            city,
            phone_number, 
            instagram,
            email, 
            password,
            responsible_person,
            responsible_person_phone,
            baptismal_certificate,
            certificate_first_communion,
            rg,
            profile_photo,
            enrollment_date,
            status: status || 'active',
            turma_id
        };

        console.log(`🔄 Atualizando crismando ID ${req.params.id} com dados:`, crismandoData);
        
        const updatedCrismando = await crismandoModel.updateCrismando(req.params.id, crismandoData);
        if (!updatedCrismando) {
            return res.status(404).json({ message: "Crismando não encontrado!" });
        }
        res.json(updatedCrismando);
    } catch (error) {
        console.error("❌ Erro ao atualizar crismando:", error.message);
        
        // Tratamento específico para email duplicado
        if (error.message.includes('duplicate key value violates unique constraint')) {
            return res.status(409).json({ 
                message: "Erro: Email já está em uso por outro crismando!" 
            });
        }
        
        res.status(500).json({ 
            message: "Erro ao atualizar crismando!", 
            error: error.message 
        });
    }
};

const deleteCrismando = async (req, res) => {
    try {
        const result = await crismandoModel.deleteCrismando(req.params.id);
        
        if (result.error) {
            return res.status(404).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar crismando!" });
    }
};

module.exports = { 
    getAllCrismandos, 
    getCrismandosByTurma, 
    getCrismando, 
    createCrismando, 
    updateCrismando, 
    deleteCrismando 
};
