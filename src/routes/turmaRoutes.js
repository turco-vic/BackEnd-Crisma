const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas de crisma
 */

/**
 * @swagger
 * /api/turmas:
 *   get:
 *     summary: Lista todas as turmas
 *     tags: [Turmas]
 *     responses:
 *       200:
 *         description: Lista de turmas com contagem de crismandos
 */
router.get("/", turmaController.getAllTurmas);

/**
 * @swagger
 * /api/turmas/{id}:
 *   get:
 *     summary: Busca turma por ID
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turma encontrada
 *       404:
 *         description: Turma não encontrada
 */
router.get("/:id", turmaController.getTurma);

/**
 * @swagger
 * /api/turmas:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                 type: string
 *               description:
 *                 type: string
 *               coordinator_name:
 *                 type: string
 *               coordinator_phone:
 *                 type: string
 *               coordinator_email:
 *                 type: string
 *               max_capacity:
 *                 type: integer
 *               meeting_day:
 *                 type: string
 *               meeting_time:
 *                 type: string
 *                 format: time
 *               classroom_location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 */
router.post("/", turmaController.createTurma);

/**
 * @swagger
 * /api/turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma existente
 *     tags: [Turmas]
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
 *               name:
 *                 type: string
 *               year:
 *                 type: string
 *               description:
 *                 type: string
 *               coordinator_name:
 *                 type: string
 *               coordinator_phone:
 *                 type: string
 *               coordinator_email:
 *                 type: string
 *               max_capacity:
 *                 type: integer
 *               meeting_day:
 *                 type: string
 *               meeting_time:
 *                 type: string
 *                 format: time
 *               classroom_location:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.put("/:id", turmaController.updateTurma);

/**
 * @swagger
 * /api/turmas/{id}:
 *   delete:
 *     summary: Deleta uma turma
 *     tags: [Turmas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turma deletada com sucesso
 *       404:
 *         description: Turma não encontrada
 */
router.delete("/:id", turmaController.deleteTurma);

module.exports = router;
