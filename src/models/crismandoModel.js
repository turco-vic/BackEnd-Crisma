const pool = require("../config/database");

const getCrismandos = async () => {
    const result = await pool.query(
        `SELECT crismandos.*, salas.name AS sala_name 
        FROM crismandos 
        LEFT JOIN salas ON crismandos.sala_id = salas.id`
    );
    return result.rows;
};

const getCrismandoById = async (id) => {
    const result = await pool.query(
        `SELECT crismandos.*, salas.name AS sala_name 
        FROM crismandos 
        LEFT JOIN salas ON crismandos.sala_id = salas.id 
        WHERE crismandos.id = $1`, [id]
    );
    return result.rows[0];
};

const createCrismando = async (name, sala_id, photo) => {
    console.log("crismandoModel - params:", name, sala_id, photo);
    const result = await pool.query(
        "INSERT INTO crismandos (name, sala_id, photo) VALUES ($1, $2, $3) RETURNING *",
        [name, sala_id, photo]
    );
    console.log("crismandoModel - result:", result.rows[0]);
    return result.rows[0];
};

const updateCrismando = async (id, name, sala_id) => {
    const result = await pool.query(
        "UPDATE crismandos SET name = $1, sala_id = $2 WHERE id = $3 RETURNING *",
        [name, sala_id, id]
    );
    return result.rows[0];
};

const deleteCrismando = async (id) => {
    const result = await pool.query("DELETE FROM crismandos WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Crismando não encontrado!" };
    }
    return { message: "Crismando deletado com sucesso!" };
};

module.exports = { getCrismandos, getCrismandoById, createCrismando, updateCrismando, deleteCrismando };
