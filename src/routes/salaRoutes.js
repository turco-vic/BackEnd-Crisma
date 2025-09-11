const express = require("express");
const router = express.Router();
const salaController = require("../controllers/salaController");

router.get("/", salaController.getAllSalas);
router.get("/:id", salaController.getSala);
router.post("/", salaController.createSala);
router.put("/:id", salaController.updateSala);
router.delete("/:id", salaController.deleteSala);

module.exports = router;
