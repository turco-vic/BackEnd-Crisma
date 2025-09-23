const pool = require("../config/database");

const getPresencas = async () => {
    const result = await pool.query(`
        SELECT p.*, 
               c.name as crismando_name, 
               c.surname as crismando_surname,
               e.titulo as encontro_titulo,
               e.numero_encontro,
               t.name as turma_name
        FROM presencas p 
        LEFT JOIN crismandos c ON p.crismando_id = c.id
        LEFT JOIN encontros e ON p.encontro_id = e.id
        LEFT JOIN turmas t ON e.turma_id = t.id
        ORDER BY p.data_registro DESC
    `);
    return result.rows;
};

const getPresencasByEncontro = async (encontro_id) => {
    const result = await pool.query(`
        SELECT p.*, 
               c.name as crismando_name, 
               c.surname as crismando_surname,
               c.phone_number as crismando_phone
        FROM presencas p 
        RIGHT JOIN crismandos c ON p.crismando_id = c.id
        LEFT JOIN encontros e ON p.encontro_id = e.id
        WHERE e.id = $1 OR (p.encontro_id IS NULL AND c.turma_id = (SELECT turma_id FROM encontros WHERE id = $1))
        ORDER BY c.name, c.surname
    `, [encontro_id]);
    return result.rows;
};

const getPresencasByCrismando = async (crismando_id) => {
    const result = await pool.query(`
        SELECT p.*, 
               e.titulo as encontro_titulo,
               e.numero_encontro,
               e.data_encontro
        FROM presencas p 
        RIGHT JOIN encontros e ON p.encontro_id = e.id
        LEFT JOIN crismandos c ON p.crismando_id = c.id
        WHERE c.id = $1 OR (p.crismando_id IS NULL AND e.turma_id = (SELECT turma_id FROM crismandos WHERE id = $1))
        ORDER BY e.numero_encontro
    `, [crismando_id]);
    return result.rows;
};

const marcarPresenca = async (crismando_id, encontro_id, presente, justificativa = null, observacoes = null) => {
    const result = await pool.query(`
        INSERT INTO presencas (crismando_id, encontro_id, presente, justificativa, observacoes)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (crismando_id, encontro_id) 
        DO UPDATE SET 
            presente = EXCLUDED.presente,
            justificativa = EXCLUDED.justificativa,
            observacoes = EXCLUDED.observacoes,
            data_registro = CURRENT_TIMESTAMP
        RETURNING *
    `, [crismando_id, encontro_id, presente, justificativa, observacoes]);
    
    return result.rows[0];
};

const marcarPresencasLote = async (presencas) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const results = [];
        for (const presenca of presencas) {
            const { crismando_id, encontro_id, presente, justificativa, observacoes } = presenca;
            const result = await client.query(`
                INSERT INTO presencas (crismando_id, encontro_id, presente, justificativa, observacoes)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (crismando_id, encontro_id) 
                DO UPDATE SET 
                    presente = EXCLUDED.presente,
                    justificativa = EXCLUDED.justificativa,
                    observacoes = EXCLUDED.observacoes,
                    data_registro = CURRENT_TIMESTAMP
                RETURNING *
            `, [crismando_id, encontro_id, presente, justificativa, observacoes]);
            
            results.push(result.rows[0]);
        }
        
        await client.query('COMMIT');
        return results;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const getRelatorioPresencas = async (turma_id) => {
    const result = await pool.query(`
        SELECT 
            c.id as crismando_id,
            c.name as crismando_name,
            c.surname as crismando_surname,
            COUNT(e.id) as total_encontros,
            COUNT(p.id) as encontros_registrados,
            COUNT(CASE WHEN p.presente = true THEN 1 END) as total_presencas,
            COUNT(CASE WHEN p.presente = false THEN 1 END) as total_faltas,
            ROUND((COUNT(CASE WHEN p.presente = true THEN 1 END) * 100.0 / NULLIF(COUNT(e.id), 0)), 2) as percentual_presenca
        FROM crismandos c
        LEFT JOIN turmas t ON c.turma_id = t.id
        LEFT JOIN encontros e ON t.id = e.turma_id
        LEFT JOIN presencas p ON (c.id = p.crismando_id AND e.id = p.encontro_id)
        WHERE c.turma_id = $1
        GROUP BY c.id, c.name, c.surname
        ORDER BY c.name, c.surname
    `, [turma_id]);
    
    return result.rows;
};

const updatePresenca = async (id, dadosPresenca) => {
    const { presente, justificativa, observacoes } = dadosPresenca;
    
    const result = await pool.query(`
        UPDATE presencas 
        SET presente = $1, justificativa = $2, observacoes = $3, data_registro = CURRENT_TIMESTAMP
        WHERE id = $4 
        RETURNING *
    `, [presente, justificativa, observacoes, id]);
    
    return result.rows[0];
};

const deletePresenca = async (id) => {
    const result = await pool.query(`
        DELETE FROM presencas 
        WHERE id = $1 
        RETURNING *
    `, [id]);
    
    return result.rows[0];
};

module.exports = { 
    getPresencas, 
    getPresencasByEncontro, 
    getPresencasByCrismando, 
    marcarPresenca, 
    marcarPresencasLote,
    getRelatorioPresencas,
    updatePresenca,
    deletePresenca
};
