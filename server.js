require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crismandoRoutes = require("./src/routes/crismandoRoutes");
const salaRoutes = require("./src/routes/salaRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Middleware para log de todas as requisições
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// Rota de teste
app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});

console.log("🔧 Registrando rotas...");
app.use("/api/crismandos", crismandoRoutes);
app.use("/api/salas", salaRoutes);
console.log("✅ Rotas registradas");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
