const pool = require("../config/database");

const getCoordenadores = async () => {
    const result = await pool.query("SELECT * FROM coordenadores ORDER BY nome, sobrenome");
    return result.rows;
};

const getCoordenadorById = async (id) => {
    const result = await pool.query("SELECT * FROM coordenadores WHERE id = $1", [id]);
    return result.rows[0];
};

const createCoordenador = async (data) => {
    const { nome, sobrenome, telefone, email, senha, foto_perfil } = data;
    const result = await pool.query(
        `INSERT INTO coordenadores (nome, sobrenome, telefone, email, senha, foto_perfil) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nome, sobrenome, telefone, email, senha, foto_perfil]
    );
    return result.rows[0];
};

const updateCoordenador = async (id, data) => {
    const { nome, sobrenome, telefone, email, senha, foto_perfil } = data;
    const result = await pool.query(
        `UPDATE coordenadores SET nome = $1, sobrenome = $2, telefone = $3, email = $4, senha = $5, foto_perfil = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *`,
        [nome, sobrenome, telefone, email, senha, foto_perfil, id]
    );
    return result.rows[0];
};

const deleteCoordenador = async (id) => {
    const result = await pool.query("DELETE FROM coordenadores WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Coordenador não encontrado!" };
    }
    return { message: "Coordenador deletado com sucesso!" };
};

module.exports = { getCoordenadores, getCoordenadorById, createCoordenador, updateCoordenador, deleteCoordenador };