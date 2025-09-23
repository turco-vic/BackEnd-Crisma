const presencaModel = require("../models/presencaModel");

const getAllPresencas = async (req, res) => {
    try {
        const presencas = await presencaModel.getPresencas();
        res.json(presencas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar presenças!" });
    }
};

const getPresencasByEncontro = async (req, res) => {
    try {
        const { encontro_id } = req.params;
        const presencas = await presencaModel.getPresencasByEncontro(encontro_id);
        res.json(presencas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar presenças do encontro!" });
    }
};

const getPresencasByCrismando = async (req, res) => {
    try {
        const { crismando_id } = req.params;
        const presencas = await presencaModel.getPresencasByCrismando(crismando_id);
        res.json(presencas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar presenças do crismando!" });
    }
};

const marcarPresenca = async (req, res) => {
    try {
        const { crismando_id, encontro_id, presente, justificativa, observacoes } = req.body;
        
        if (!crismando_id || !encontro_id || presente === undefined) {
            return res.status(400).json({ 
                message: "crismando_id, encontro_id e presente são obrigatórios!" 
            });
        }
        
        const presenca = await presencaModel.marcarPresenca(
            crismando_id, encontro_id, presente, justificativa, observacoes
        );
        
        res.status(201).json(presenca);
    } catch (error) {
        res.status(500).json({ message: "Erro ao marcar presença!", error: error.message });
    }
};

const marcarPresencasLote = async (req, res) => {
    try {
        const { presencas } = req.body;
        
        if (!presencas || !Array.isArray(presencas) || presencas.length === 0) {
            return res.status(400).json({ 
                message: "Array de presenças é obrigatório!" 
            });
        }
        
        const resultados = await presencaModel.marcarPresencasLote(presencas);
        res.status(201).json({
            message: "Presenças marcadas com sucesso!",
            total: resultados.length,
            presencas: resultados
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao marcar presenças em lote!", error: error.message });
    }
};

const getRelatorioPresencas = async (req, res) => {
    try {
        const { turma_id } = req.params;
        const relatorio = await presencaModel.getRelatorioPresencas(turma_id);
        res.json(relatorio);
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar relatório de presenças!" });
    }
};

const updatePresenca = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosPresenca = req.body;
        
        const presencaAtualizada = await presencaModel.updatePresenca(id, dadosPresenca);
        if (!presencaAtualizada) {
            return res.status(404).json({ message: "Presença não encontrada!" });
        }
        
        res.json({
            message: "Presença atualizada com sucesso!",
            presenca: presencaAtualizada
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar presença!", error: error.message });
    }
};

const deletePresenca = async (req, res) => {
    try {
        const { id } = req.params;
        
        const presencaRemovida = await presencaModel.deletePresenca(id);
        if (!presencaRemovida) {
            return res.status(404).json({ message: "Presença não encontrada!" });
        }
        
        res.json({ message: "Presença removida com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover presença!", error: error.message });
    }
};

module.exports = {
    getAllPresencas,
    getPresencasByEncontro,
    getPresencasByCrismando,
    marcarPresenca,
    marcarPresencasLote,
    getRelatorioPresencas,
    updatePresenca,
    deletePresenca
};
