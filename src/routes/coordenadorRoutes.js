const express = require("express");
const router = express.Router();
const coordenadorController = require("../controllers/coordenadorController.js");

/**
 * @swagger
 * tags:
 *   name: Coordenadores
 *   description: Gerenciamento de coordenadores
 */

/**
 * @swagger
 * /api/coordenadores:
 *   get:
 *     summary: Lista todos os coordenadores
 *     tags: [Coordenadores]
 *     responses:
 *       200:
 *         description: Lista de coordenadores
 */
router.get("/", coordenadorController.getAllCoordenadores);

/**
 * @swagger
 * /api/coordenadores/{id}:
 *   get:
 *     summary: Busca coordenador por ID
 *     tags: [Coordenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coordenador encontrado
 *       404:
 *         description: Coordenador não encontrado
 */
router.get("/:id", coordenadorController.getCoordenador);

/**
 * @swagger
 * /api/coordenadores:
 *   post:
 *     summary: Cria um novo coordenador
 *     tags: [Coordenadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Coordenador criado com sucesso
 */
router.post("/", coordenadorController.createCoordenador);

/**
 * @swagger
 * /api/coordenadores/{id}:
 *   put:
 *     summary: Atualiza um coordenador existente
 *     tags: [Coordenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Coordenador atualizado com sucesso
 *       404:
 *         description: Coordenador não encontrado
 */
router.put("/:id", coordenadorController.updateCoordenador);

/**
 * @swagger
 * /api/coordenadores/{id}:
 *   delete:
 *     summary: Deleta um coordenador
 *     tags: [Coordenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coordenador deletado com sucesso
 *       404:
 *         description: Coordenador não encontrado
 */
router.delete("/:id", coordenadorController.deleteCoordenador);

module.exports = router;
