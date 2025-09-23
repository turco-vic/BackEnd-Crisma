const pool = require("../config/database");

const getTurmas = async () => {
    const result = await pool.query(`
        SELECT t.*, 
               COUNT(c.id) as total_crismandos
        FROM turmas t 
        LEFT JOIN crismandos c ON t.id = c.turma_id 
        GROUP BY t.id
        ORDER BY t.name
    `);
    return result.rows;
};

const getTurmaById = async (id) => {
    const result = await pool.query(`
        SELECT t.*, 
               COUNT(c.id) as total_crismandos
        FROM turmas t 
        LEFT JOIN crismandos c ON t.id = c.turma_id 
        WHERE t.id = $1
        GROUP BY t.id
    `, [id]);
    return result.rows[0];
};

const createTurma = async (turmaData) => {
    const {
        name, year, description, coordinator_name, coordinator_phone, 
        coordinator_email, max_capacity, meeting_day, meeting_time, 
        classroom_location, start_date, end_date
    } = turmaData;
    
    const result = await pool.query(`
        INSERT INTO turmas (
            name, year, description, coordinator_name, coordinator_phone, 
            coordinator_email, max_capacity, meeting_day, meeting_time, 
            classroom_location, start_date, end_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
        RETURNING *
    `, [name, year, description, coordinator_name, coordinator_phone, 
        coordinator_email, max_capacity, meeting_day, meeting_time, 
        classroom_location, start_date, end_date]);
    
    return result.rows[0];
};

const updateTurma = async (id, turmaData) => {
    const {
        name, year, description, coordinator_name, coordinator_phone, 
        coordinator_email, max_capacity, meeting_day, meeting_time, 
        classroom_location, status, start_date, end_date
    } = turmaData;
    
    const result = await pool.query(`
        UPDATE turmas SET 
            name = $1, year = $2, description = $3, coordinator_name = $4, 
            coordinator_phone = $5, coordinator_email = $6, max_capacity = $7, 
            meeting_day = $8, meeting_time = $9, classroom_location = $10, 
            status = $11, start_date = $12, end_date = $13, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $14 RETURNING *
    `, [name, year, description, coordinator_name, coordinator_phone, 
        coordinator_email, max_capacity, meeting_day, meeting_time, 
        classroom_location, status, start_date, end_date, id]);
    
    return result.rows[0];
};

const deleteTurma = async (id) => {
    const result = await pool.query("DELETE FROM turmas WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Turma não encontrada!" };
    }
    return { message: "Turma deletada com sucesso!" };
};

module.exports = { getTurmas, getTurmaById, createTurma, updateTurma, deleteTurma };
