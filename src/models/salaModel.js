const pool = require("../config/database");

const getSalas = async () => {
    const result = await pool.query("SELECT * FROM salas");
    return result.rows;
};

const getSalaById = async (id) => {
    const result = await pool.query("SELECT * FROM salas WHERE id = $1", [id]);
    return result.rows[0];
};

const createSala = async (name, founder) => {
    const result = await pool.query(
        "INSERT INTO salas (name, founder) VALUES ($1, $2) RETURNING *",
        [name, founder]
    );
    return result.rows[0];
};

const updateSala = async (id, name, founder) => {
    const result = await pool.query(
        "UPDATE salas SET name = $1, founder = $2 WHERE id = $3 RETURNING *",
        [name, founder, id]
    );
    return result.rows[0];
};

const deleteSala = async (id) => {
    const result = await pool.query("DELETE FROM salas WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Sala não encontrada!" };
    }
    return { message: "Sala deletada com sucesso!" };
};

module.exports = { getSalas, getSalaById, createSala, updateSala, deleteSala };
