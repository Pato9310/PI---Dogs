const express = require("express");
const router = express.Router();
const { getTemperaments } = require("../controllers/Temperament.controller");

// Configuracion del router
router.get("/", getTemperaments);

module.exports = router;
