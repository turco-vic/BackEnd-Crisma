const turmaModel = require("../models/turmaModel");

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getTurmas();
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Turmas!" });
    }
};

const getTurma = async (req, res) => {
    try {
        const turma = await turmaModel.getTurmaById(req.params.id);
        if (!turma) {
            return res.status(404).json({ message: "Turma não encontrada!" });
        }
        res.json(turma);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar Turma!" });
    }
};

const createTurma = async (req, res) => {
    try {
        const turmaData = req.body;
        const newTurma = await turmaModel.createTurma(turmaData);
        res.status(201).json(newTurma);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar Turma!", error: error.message });
    }
};

const updateTurma = async (req, res) => {
    try {
        const turmaData = req.body;
        const updatedTurma = await turmaModel.updateTurma(req.params.id, turmaData);
        if (!updatedTurma) {
            return res.status(404).json({ message: "Turma não encontrada!" });
        }
        res.json(updatedTurma);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar Turma!" });
    }
};

const deleteTurma = async (req, res) => {
    try {
        const result = await turmaModel.deleteTurma(req.params.id);
        
        if (result.error) {
            return res.status(404).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Turma!" });
    }
};

module.exports = { getAllTurmas, getTurma, createTurma, updateTurma, deleteTurma };
