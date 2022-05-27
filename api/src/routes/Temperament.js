const express = require("express");
const router = express.Router();
const {
  getTemperaments,
  createTemperament,
} = require("../controllers/Temperament.controller");

// Configuracion del router
router.get("/", getTemperaments);
router.post("/create", createTemperament);

module.exports = router;
