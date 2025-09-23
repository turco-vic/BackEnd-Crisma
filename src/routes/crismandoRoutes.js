const express = require("express");
const router = express.Router();
const crismandoController = require("../controllers/crismandoController.js");
const upload = require("../middleware/upload.js");

/**
 * @swagger
 * tags:
 *   name: Crismandos
 *   description: Gerenciamento de crismandos
 */

/**
 * @swagger
 * /api/crismandos:
 *   get:
 *     summary: Lista todos os crismandos
 *     tags: [Crismandos]
 *     responses:
 *       200:
 *         description: Lista de crismandos
 */
router.get("/", crismandoController.getAllCrismandos);

/**
 * @swagger
 * /api/crismandos/turma/{turma_id}:
 *   get:
 *     summary: Lista crismandos de uma turma específica
 *     tags: [Crismandos]
 *     parameters:
 *       - in: path
 *         name: turma_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de crismandos da turma
 */
router.get("/turma/:turma_id", crismandoController.getCrismandosByTurma);

/**
 * @swagger
 * /api/crismandos/{id}:
 *   get:
 *     summary: Busca crismando por ID
 *     tags: [Crismandos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Crismando encontrado
 *       404:
 *         description: Crismando não encontrado
 */
router.get("/:id", crismandoController.getCrismando);

/**
 * @swagger
 * /api/crismandos:
 *   post:
 *     summary: Cria um novo crismando
 *     tags: [Crismandos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               turma_id:
 *                 type: integer
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Crismando criado com sucesso
 */
router.post("/", upload.single("profile_photo"), crismandoController.createCrismando);

/**
 * @swagger
 * /api/crismandos/{id}:
 *   put:
 *     summary: Atualiza um crismando existente
 *     tags: [Crismandos]
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
 *               surname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               turma_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Crismando atualizado com sucesso
 *       404:
 *         description: Crismando não encontrado
 */
router.put("/:id", crismandoController.updateCrismando);

/**
 * @swagger
 * /api/crismandos/{id}:
 *   delete:
 *     summary: Deleta um crismando
 *     tags: [Crismandos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Crismando deletado com sucesso
 *       404:
 *         description: Crismando não encontrado
 */
router.delete("/:id", crismandoController.deleteCrismando);

module.exports = router;
