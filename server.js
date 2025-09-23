require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crismandoRoutes = require("./src/routes/crismandoRoutes");
const turmaRoutes = require("./src/routes/turmaRoutes");
const encontroRoutes = require("./src/routes/encontroRoutes");
const presencaRoutes = require("./src/routes/presencaRoutes");
const setupSwagger = require('./src/config/swagger');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});


app.get("/", (req, res) => {
    res.json({ message: "API de Crisma funcionando! 🙏" });
});

console.log("🔧 Registrando rotas...");
app.use("/api/crismandos", crismandoRoutes);
app.use("/api/turmas", turmaRoutes);
app.use("/api/encontros", encontroRoutes);
app.use("/api/presencas", presencaRoutes);
console.log("✅ Rotas registradas");

setupSwagger(app);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
