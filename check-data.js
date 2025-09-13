require("dotenv").config();
const { Client } = require("pg");

async function checkTurmas() {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    try {
        await client.connect();
        console.log("✅ Conectado ao banco");
        
        const turmas = await client.query("SELECT id, name FROM turmas ORDER BY id");
        console.log("📋 Turmas disponíveis:");
        turmas.rows.forEach(turma => {
            console.log(`  ID: ${turma.id} - Nome: ${turma.name}`);
        });
        
        const crismandos = await client.query("SELECT id, name, surname, turma_id FROM crismandos ORDER BY id");
        console.log("\n👥 Crismandos existentes:");
        crismandos.rows.forEach(crismando => {
            console.log(`  ID: ${crismando.id} - ${crismando.name} ${crismando.surname} (Turma: ${crismando.turma_id})`);
        });
        
    } catch (error) {
        console.error("❌ Erro:", error.message);
    } finally {
        await client.end();
    }
}

checkTurmas();
