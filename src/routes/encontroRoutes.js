const express = require("express");
const router = express.Router();
const encontroController = require("../controllers/encontroController");

/**
 * @swagger
 * tags:
 *   name: Encontros
 *   description: Gerenciamento de encontros de crisma
 */

/**
 * @swagger
 * /api/encontros:
 *   get:
 *     summary: Lista todos os encontros
 *     tags: [Encontros]
 *     responses:
 *       200:
 *         description: Lista de encontros
 */
router.get("/", encontroController.getAllEncontros);

/**
 * @swagger
 * /api/encontros/turma/{turma_id}:
 *   get:
 *     summary: Lista encontros de uma turma específica
 *     tags: [Encontros]
 *     parameters:
 *       - in: path
 *         name: turma_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de encontros da turma
 */
router.get("/turma/:turma_id", encontroController.getEncontrosByTurma);

/**
 * @swagger
 * /api/encontros/{id}:
 *   get:
 *     summary: Busca encontro por ID
 *     tags: [Encontros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Encontro encontrado
 *       404:
 *         description: Encontro não encontrado
 */
router.get("/:id", encontroController.getEncontro);

/**
 * @swagger
 * /api/encontros:
 *   post:
 *     summary: Cria um novo encontro
 *     tags: [Encontros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turma_id:
 *                 type: integer
 *               numero_encontro:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_encontro:
 *                 type: string
 *                 format: date
 *               horario_inicio:
 *                 type: string
 *                 format: time
 *               horario_fim:
 *                 type: string
 *                 format: time
 *               local:
 *                 type: string
 *     responses:
 *       201:
 *         description: Encontro criado com sucesso
 */
router.post("/", encontroController.createEncontro);

/**
 * @swagger
 * /api/encontros/{id}:
 *   put:
 *     summary: Atualiza um encontro existente
 *     tags: [Encontros]
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
 *               numero_encontro:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_encontro:
 *                 type: string
 *                 format: date
 *               horario_inicio:
 *                 type: string
 *                 format: time
 *               horario_fim:
 *                 type: string
 *                 format: time
 *               local:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [agendado, realizado, cancelado]
 *     responses:
 *       200:
 *         description: Encontro atualizado com sucesso
 *       404:
 *         description: Encontro não encontrado
 */
router.put("/:id", encontroController.updateEncontro);

/**
 * @swagger
 * /api/encontros/{id}:
 *   delete:
 *     summary: Deleta um encontro
 *     tags: [Encontros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Encontro deletado com sucesso
 *       404:
 *         description: Encontro não encontrado
 */
router.delete("/:id", encontroController.deleteEncontro);

module.exports = router;
