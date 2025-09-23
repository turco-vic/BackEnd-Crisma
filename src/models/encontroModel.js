const pool = require("../config/database");

const getEncontros = async () => {
    const result = await pool.query(`
        SELECT e.*, t.name as turma_name 
        FROM encontros e 
        LEFT JOIN turmas t ON e.turma_id = t.id 
        ORDER BY e.data_encontro, e.numero_encontro
    `);
    return result.rows;
};

const getEncontrosByTurma = async (turma_id) => {
    const result = await pool.query(`
        SELECT e.*, t.name as turma_name,
               COUNT(p.id) as total_presencas,
               COUNT(CASE WHEN p.presente = true THEN 1 END) as total_presentes,
               COUNT(CASE WHEN p.presente = false THEN 1 END) as total_faltas
        FROM encontros e 
        LEFT JOIN turmas t ON e.turma_id = t.id 
        LEFT JOIN presencas p ON e.id = p.encontro_id
        WHERE e.turma_id = $1 
        GROUP BY e.id, t.name
        ORDER BY e.numero_encontro
    `, [turma_id]);
    return result.rows;
};

const getEncontroById = async (id) => {
    const result = await pool.query(`
        SELECT e.*, t.name as turma_name 
        FROM encontros e 
        LEFT JOIN turmas t ON e.turma_id = t.id 
        WHERE e.id = $1
    `, [id]);
    return result.rows[0];
};

const createEncontro = async (encontroData) => {
    const {
        turma_id, numero_encontro, titulo, descricao, data_encontro,
        horario_inicio, horario_fim, local, observacoes
    } = encontroData;
    
    const result = await pool.query(`
        INSERT INTO encontros (
            turma_id, numero_encontro, titulo, descricao, data_encontro,
            horario_inicio, horario_fim, local, observacoes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *
    `, [turma_id, numero_encontro, titulo, descricao, data_encontro,
        horario_inicio, horario_fim, local, observacoes]);
    
    return result.rows[0];
};

const updateEncontro = async (id, encontroData) => {
    const {
        numero_encontro, titulo, descricao, data_encontro,
        horario_inicio, horario_fim, local, status, observacoes
    } = encontroData;
    
    const result = await pool.query(`
        UPDATE encontros SET 
            numero_encontro = $1, titulo = $2, descricao = $3, 
            data_encontro = $4, horario_inicio = $5, horario_fim = $6, 
            local = $7, status = $8, observacoes = $9,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $10 RETURNING *
    `, [numero_encontro, titulo, descricao, data_encontro,
        horario_inicio, horario_fim, local, status, observacoes, id]);
    
    return result.rows[0];
};

const deleteEncontro = async (id) => {
    const result = await pool.query("DELETE FROM encontros WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Encontro não encontrado!" };
    }
    return { message: "Encontro deletado com sucesso!" };
};

module.exports = { 
    getEncontros, 
    getEncontrosByTurma, 
    getEncontroById, 
    createEncontro, 
    updateEncontro, 
    deleteEncontro 
};
