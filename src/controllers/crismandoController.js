const crismandoModel = require("../models/crismandoModel");

const getAllCrismandos = async (req, res) => {
    try {
        const crismandos = await crismandoModel.getCrismandos();
        res.json(crismandos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Crismando!" });
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
        res.status(500).json({ message: "Erro ao buscar Crismando!" });
    }
};

const createCrismando = async (req, res) => {
    console.log("Controller - req.body:", req.body);
    try {
        const { name, sala_id } = req.body;
        const sala_id_number = parseInt(sala_id);
        console.log("Controller - name:", name, "sala_id:", sala_id_number);
        
        const photo = req.file ? req.file.filename : null;
        const newCrismando = await crismandoModel.createCrismando(name, sala_id_number, photo);
        console.log("Controller - crismando criado:", newCrismando);
        res.status(201).json(newCrismando);
    } catch (error) {
        console.log("Controller - erro:", error.message);
        res.status(500).json({ message: "Erro ao criar crismando!", error: error.message });
    }
};

const updateCrismando = async (req, res) => {
    try {
        const { name, sala_id } = req.body;
        const updateCrismando = await crismandoModel.updateCrismando(req.params.id, name, sala_id);
        if (!updateCrismando) {
            return res.status(404).json({ message: "Crismando não encontrado!" });
        }
        res.json(updatecCrismando);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar Crismando!" });
    }
};

const deleteCrismando = async (req, res) => {
    try {
        const message = await CrismandoModel.deletecrismando(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Crismando!" });
    }
};

module.exports = { getAllCrismandos, getCrismando, createCrismando, updateCrismando, deleteCrismando };
