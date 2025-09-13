const express = require("express");
const router = express.Router();
const presencaController = require("../controllers/presencaController");

/**
 * @swagger
 * tags:
 *   name: Presenças
 *   description: Controle de presenças dos crismandos
 */

/**
 * @swagger
 * /api/presencas:
 *   get:
 *     summary: Lista todas as presenças
 *     tags: [Presenças]
 *     responses:
 *       200:
 *         description: Lista de presenças
 */
router.get("/", presencaController.getAllPresencas);

/**
 * @swagger
 * /api/presencas/encontro/{encontro_id}:
 *   get:
 *     summary: Lista presenças de um encontro específico
 *     tags: [Presenças]
 *     parameters:
 *       - in: path
 *         name: encontro_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de presenças do encontro
 */
router.get("/encontro/:encontro_id", presencaController.getPresencasByEncontro);

/**
 * @swagger
 * /api/presencas/crismando/{crismando_id}:
 *   get:
 *     summary: Lista presenças de um crismando específico
 *     tags: [Presenças]
 *     parameters:
 *       - in: path
 *         name: crismando_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de presenças do crismando
 */
router.get("/crismando/:crismando_id", presencaController.getPresencasByCrismando);

/**
 * @swagger
 * /api/presencas/relatorio/{turma_id}:
 *   get:
 *     summary: Relatório de presenças de uma turma
 *     tags: [Presenças]
 *     parameters:
 *       - in: path
 *         name: turma_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relatório de presenças da turma
 */
router.get("/relatorio/:turma_id", presencaController.getRelatorioPresencas);

/**
 * @swagger
 * /api/presencas:
 *   post:
 *     summary: Marca presença individual
 *     tags: [Presenças]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crismando_id:
 *                 type: integer
 *               encontro_id:
 *                 type: integer
 *               presente:
 *                 type: boolean
 *               justificativa:
 *                 type: string
 *               observacoes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Presença marcada com sucesso
 */
router.post("/", presencaController.marcarPresenca);

/**
 * @swagger
 * /api/presencas/lote:
 *   post:
 *     summary: Marca presenças em lote
 *     tags: [Presenças]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presencas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     crismando_id:
 *                       type: integer
 *                     encontro_id:
 *                       type: integer
 *                     presente:
 *                       type: boolean
 *                     justificativa:
 *                       type: string
 *     responses:
 *       201:
 *         description: Presenças marcadas com sucesso
 */
router.post("/lote", presencaController.marcarPresencasLote);

/**
 * @swagger
 * /api/presencas/{id}:
 *   put:
 *     summary: Atualiza uma presença existente
 *     tags: [Presenças]
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
 *               presente:
 *                 type: boolean
 *               justificativa:
 *                 type: string
 *                 nullable: true
 *               observacoes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Presença atualizada com sucesso
 *       404:
 *         description: Presença não encontrada
 */
router.put("/:id", presencaController.updatePresenca);

/**
 * @swagger
 * /api/presencas/{id}:
 *   delete:
 *     summary: Remove um registro de presença
 *     tags: [Presenças]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Presença removida com sucesso
 *       404:
 *         description: Presença não encontrada
 */
router.delete("/:id", presencaController.deletePresenca);

module.exports = router;
