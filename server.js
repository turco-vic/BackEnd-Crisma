require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crismandoRoutes = require("./src/routes/crismandoRoutes");
const salaRoutes = require("./src/routes/salaRoutes");
const setupSwagger = require('./src/config/swagger'); // Swagger aqui
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/wizards", crismandoRoutes);
app.use("/api/houses", salaRoutes);
setupSwagger(app); // Ativa o Swagger
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
