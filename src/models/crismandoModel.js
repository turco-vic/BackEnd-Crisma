const pool = require("../config/database");

const getCrismandos = async () => {
    console.log("🔌 Conectando ao banco para buscar crismandos...");
    const result = await pool.query(`
        SELECT c.*, t.name as turma_name 
        FROM crismandos c 
        LEFT JOIN turmas t ON c.turma_id = t.id 
        ORDER BY c.name, c.surname
    `);
    console.log(`📊 Query executada, ${result.rows.length} linhas retornadas`);
    return result.rows;
};

const getCrismandosByTurma = async (turma_id) => {
    const result = await pool.query(`
        SELECT c.*, t.name as turma_name,
               COUNT(p.id) as total_encontros_registrados,
               COUNT(CASE WHEN p.presente = true THEN 1 END) as total_presencas,
               COUNT(CASE WHEN p.presente = false THEN 1 END) as total_faltas
        FROM crismandos c 
        LEFT JOIN turmas t ON c.turma_id = t.id 
        LEFT JOIN presencas p ON c.id = p.crismando_id
        WHERE c.turma_id = $1 
        GROUP BY c.id, t.name
        ORDER BY c.name, c.surname
    `, [turma_id]);
    return result.rows;
};

const getCrismandoById = async (id) => {
    const result = await pool.query(`
        SELECT c.*, t.name as turma_name 
        FROM crismandos c 
        LEFT JOIN turmas t ON c.turma_id = t.id 
        WHERE c.id = $1
    `, [id]);
    return result.rows[0];
};

const createCrismando = async (crismandoData) => {
    const {
        name, surname, birthday, cep, road, house_number, complement,
        neighborhood, city, phone_number, instagram, email, password,
        responsible_person, responsible_person_phone, rg, turma_id
    } = crismandoData;
    
    const result = await pool.query(`
        INSERT INTO crismandos (
            name, surname, birthday, cep, road, house_number, complement,
            neighborhood, city, phone_number, instagram, email, password,
            responsible_person, responsible_person_phone, rg, turma_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
        RETURNING *
    `, [name, surname, birthday, cep, road, house_number, complement,
        neighborhood, city, phone_number, instagram, email, password,
        responsible_person, responsible_person_phone, rg, turma_id]);
    
    return result.rows[0];
};

const updateCrismando = async (id, crismandoData) => {
    const {
        name, surname, birthday, cep, road, house_number, complement,
        neighborhood, city, phone_number, instagram, email,
        responsible_person, responsible_person_phone, rg, turma_id, status
    } = crismandoData;
    
    const result = await pool.query(`
        UPDATE crismandos SET 
            name = $1, surname = $2, birthday = $3, cep = $4, road = $5, 
            house_number = $6, complement = $7, neighborhood = $8, city = $9, 
            phone_number = $10, instagram = $11, email = $12, 
            responsible_person = $13, responsible_person_phone = $14, 
            rg = $15, turma_id = $16, status = $17,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $18 RETURNING *
    `, [name, surname, birthday, cep, road, house_number, complement,
        neighborhood, city, phone_number, instagram, email,
        responsible_person, responsible_person_phone, rg, turma_id, status, id]);
    
    return result.rows[0];
};

const deleteCrismando = async (id) => {
    const result = await pool.query("DELETE FROM crismandos WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Crismando não encontrado!" };
    }
    return { message: "Crismando deletado com sucesso!" };
};

module.exports = { getCrismandos, getCrismandosByTurma, getCrismandoById, createCrismando, updateCrismando, deleteCrismando };
