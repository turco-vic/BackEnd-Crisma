const encontroModel = require("../models/encontroModel");

const getAllEncontros = async (req, res) => {
    try {
        const encontros = await encontroModel.getEncontros();
        res.json(encontros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar encontros!" });
    }
};

const getEncontrosByTurma = async (req, res) => {
    try {
        const { turma_id } = req.params;
        const encontros = await encontroModel.getEncontrosByTurma(turma_id);
        res.json(encontros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar encontros da turma!" });
    }
};

const getEncontro = async (req, res) => {
    try {
        const encontro = await encontroModel.getEncontroById(req.params.id);
        if (!encontro) {
            return res.status(404).json({ message: "Encontro não encontrado!" });
        }
        res.json(encontro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar encontro!" });
    }
};

const createEncontro = async (req, res) => {
    try {
        const encontroData = req.body;
        const newEncontro = await encontroModel.createEncontro(encontroData);
        res.status(201).json(newEncontro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar encontro!", error: error.message });
    }
};

const updateEncontro = async (req, res) => {
    try {
        const encontroData = req.body;
        const updatedEncontro = await encontroModel.updateEncontro(req.params.id, encontroData);
        if (!updatedEncontro) {
            return res.status(404).json({ message: "Encontro não encontrado!" });
        }
        res.json(updatedEncontro);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar encontro!" });
    }
};

const deleteEncontro = async (req, res) => {
    try {
        const result = await encontroModel.deleteEncontro(req.params.id);
        
        if (result.error) {
            return res.status(404).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar encontro!" });
    }
};

module.exports = { 
    getAllEncontros, 
    getEncontrosByTurma, 
    getEncontro, 
    createEncontro, 
    updateEncontro, 
    deleteEncontro 
};
