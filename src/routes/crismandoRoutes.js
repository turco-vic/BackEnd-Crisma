const express = require("express");
const router = express.Router();
const crismandoController = require("../controllers/crismandoController.js");
const upload = require("../middleware/upload.js");

router.get("/", crismandoController.getAllCrismandos);
router.get("/:id", crismandoController.getCrismando);
router.post("/", upload.single("photo"), crismandoController.createCrismando);
router.put("/:id", crismandoController.updateCrismando);
router.delete("/:id", crismandoController.deleteCrismando);

module.exports = router;
