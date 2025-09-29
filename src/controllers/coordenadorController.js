const coordenadorModel = require("../models/coordenadorModel");

const getAllCoordenadores = async (req, res) => {
    try {
        const coordenadores = await coordenadorModel.getCoordenadores();
        res.json(coordenadores);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar coordenadores!", error: error.message });
    }
};

const getCoordenador = async (req, res) => {
    try {
        const coordenador = await coordenadorModel.getCoordenadorById(req.params.id);
        if (!coordenador) {
            return res.status(404).json({ message: "Coordenador não encontrado!" });
        }
        res.json(coordenador);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar coordenador!" });
    }
};

const createCoordenador = async (req, res) => {
    try {
        const data = req.body;
        const novoCoordenador = await coordenadorModel.createCoordenador(data);
        res.status(201).json(novoCoordenador);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar coordenador!", error: error.message });
    }
};

const updateCoordenador = async (req, res) => {
    try {
        const data = req.body;
        const coordenadorAtualizado = await coordenadorModel.updateCoordenador(req.params.id, data);
        if (!coordenadorAtualizado) {
            return res.status(404).json({ message: "Coordenador não encontrado!" });
        }
        res.json(coordenadorAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar coordenador!", error: error.message });
    }
};

const deleteCoordenador = async (req, res) => {
    try {
        const result = await coordenadorModel.deleteCoordenador(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar coordenador!" });
    }
};

module.exports = {
    getAllCoordenadores,
    getCoordenador,
    createCoordenador,
    updateCoordenador,
    deleteCoordenador
};
