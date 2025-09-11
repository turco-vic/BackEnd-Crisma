require("dotenv").config();
const pool = require("./src/config/database");

async function testDatabase() {
    try {
        console.log("Testando conexão com o banco de dados...");
        const result = await pool.query("SELECT NOW()");
        console.log("✅ Conexão com o banco bem-sucedida!", result.rows[0]);
        
        console.log("Testando busca de crismandos...");
        const crismandos = await pool.query("SELECT * FROM crismandos LIMIT 5");
        console.log("✅ Crismandos encontrados:", crismandos.rows);
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Erro na conexão ou consulta:", error.message);
        process.exit(1);
    }
}

testDatabase();
