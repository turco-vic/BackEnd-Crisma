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
 *             required:
 *               - name
 *               - surname
 *               - birthday
 *               - cep
 *               - road
 *               - house_number
 *               - neighborhood
 *               - city
 *               - phone_number
 *               - instagram
 *               - email
 *               - password
 *               - responsible_person
 *               - responsible_person_phone
 *               - baptismal_certificate
 *               - certificate_first_communion
 *               - rg
 *               - profile_photo
 *               - turma_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do crismando
 *               surname:
 *                 type: string
 *                 description: Sobrenome do crismando
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento (YYYY-MM-DD)
 *               cep:
 *                 type: string
 *                 description: CEP do endereço
 *               road:
 *                 type: string
 *                 description: Nome da rua
 *               house_number:
 *                 type: string
 *                 description: Número da casa
 *               complement:
 *                 type: string
 *                 description: Complemento do endereço (opcional)
 *               neighborhood:
 *                 type: string
 *                 description: Bairro
 *               city:
 *                 type: string
 *                 description: Cidade
 *               phone_number:
 *                 type: string
 *                 description: Número de telefone
 *               instagram:
 *                 type: string
 *                 description: Instagram do crismando
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do crismando
 *               password:
 *                 type: string
 *                 description: Senha do crismando
 *               responsible_person:
 *                 type: string
 *                 description: Nome do responsável
 *               responsible_person_phone:
 *                 type: string
 *                 description: Telefone do responsável
 *               baptismal_certificate:
 *                 type: string
 *                 description: Certificado de batismo
 *               certificate_first_communion:
 *                 type: string
 *                 description: Certificado de primeira comunhão
 *               rg:
 *                 type: string
 *                 description: Número do RG
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil
 *               turma_id:
 *                 type: integer
 *                 description: ID da turma
 *     responses:
 *       201:
 *         description: Crismando criado com sucesso
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
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
 *             required:
 *               - name
 *               - surname  
 *               - birthday
 *               - cep
 *               - road
 *               - house_number
 *               - neighborhood
 *               - city
 *               - phone_number
 *               - instagram
 *               - email
 *               - password
 *               - responsible_person
 *               - responsible_person_phone
 *               - baptismal_certificate
 *               - certificate_first_communion
 *               - rg
 *               - profile_photo
 *               - turma_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do crismando
 *               surname:
 *                 type: string
 *                 description: Sobrenome do crismando
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento (YYYY-MM-DD)
 *               cep:
 *                 type: string
 *                 description: CEP do endereço
 *               road:
 *                 type: string
 *                 description: Nome da rua
 *               house_number:
 *                 type: string
 *                 description: Número da casa
 *               complement:
 *                 type: string
 *                 description: Complemento do endereço (opcional)
 *               neighborhood:
 *                 type: string
 *                 description: Bairro
 *               city:
 *                 type: string
 *                 description: Cidade
 *               phone_number:
 *                 type: string
 *                 description: Número de telefone
 *               instagram:
 *                 type: string
 *                 description: Instagram do crismando
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do crismando
 *               password:
 *                 type: string
 *                 description: Senha do crismando
 *               responsible_person:
 *                 type: string
 *                 description: Nome do responsável
 *               responsible_person_phone:
 *                 type: string
 *                 description: Telefone do responsável
 *               baptismal_certificate:
 *                 type: string
 *                 description: Certificado de batismo
 *               certificate_first_communion:
 *                 type: string
 *                 description: Certificado de primeira comunhão
 *               rg:
 *                 type: string
 *                 description: Número do RG
 *               profile_photo:
 *                 type: string
 *                 description: Foto de perfil (nome do arquivo)
 *               enrollment_date:
 *                 type: string
 *                 format: date
 *                 description: Data de inscrição (opcional, padrão hoje)
 *               status:
 *                 type: string
 *                 enum: [active, inactive, completed]
 *                 description: Status do crismando (padrão active)
 *               turma_id:
 *                 type: integer
 *                 description: ID da turma
 *     responses:
 *       200:
 *         description: Crismando atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Crismando não encontrado
 *       409:
 *         description: Email já está em uso
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
