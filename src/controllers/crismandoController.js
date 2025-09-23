const crismandoModel = require("../models/crismandoModel");

const getAllCrismandos = async (req, res) => {
    try {
        console.log("🔍 Buscando todos os crismandos...");
        const crismandos = await crismandoModel.getCrismandos();
        console.log(`✅ Encontrados ${crismandos.length} crismandos`);
        res.json(crismandos);
    } catch (error) {
        console.error("❌ Erro ao buscar crismandos:", error.message);
        res.status(500).json({ message: "Erro ao buscar crismandos!", error: error.message });
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
        const crismandoData = req.body;
        const newCrismando = await crismandoModel.createCrismando(crismandoData);
        res.status(201).json(newCrismando);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar crismando!", error: error.message });
    }
};

const updateCrismando = async (req, res) => {
    try {
        const crismandoData = req.body;
        console.log(`🔄 Atualizando crismando ID ${req.params.id} com dados:`, crismandoData);
        
        const updatedCrismando = await crismandoModel.updateCrismando(req.params.id, crismandoData);
        if (!updatedCrismando) {
            return res.status(404).json({ message: "Crismando não encontrado!" });
        }
        res.json(updatedCrismando);
    } catch (error) {
        console.error("❌ Erro ao atualizar crismando:", error.message);
        res.status(500).json({ message: "Erro ao atualizar crismando!", error: error.message });
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
