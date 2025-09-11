const salaModel = require("../models/salaModel");

const getAllSalas = async (req, res) => {
    try {
        const salas = await salaModel.getSalas();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Salas!" });
    }
};

const getSala = async (req, res) => {
    try {
        const sala = await salaModel.getSalaById(req.params.id);
        if (!sala) {
            return res.status(404).json({ message: "Sala não encontrada!" });
        }
        res.json(sala);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Sala!" });
    }
};

const createSala = async (req, res) => {
    console.log("req.body:", req.body);
    try {
        const { name, founder } = req.body;
        console.log("name:", name, "founder:", founder);
        const newSala = await salaModel.createSala(name, founder);
        console.log("newSala:", newSala);
        res.status(201).json(newSala);
    } catch (error) {
        console.log("erro:", error.message);
        res.status(500).json({ message: "Erro ao criar Sala!" });
    }
};

const updateSala = async (req, res) => {
    try {
        const { name, founder } = req.body;
        const updateSala = await salaModel.updateSala(req.params.id, name, founder);
        if (!updateSala) {
            return res.status(404).json({ message: "Sala não encontrada!" });
        }
        res.json(updateSala);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar Sala!" });
    }
};

const deleteSala = async (req, res) => {
    try {
        const result = await salaModel.deleteSala(req.params.id);
        
        if (result.error) {
            return res.status(500).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Sala!" });
    }
};

module.exports = { getAllSalas, getSala, createSala, updateSala, deleteSala };
