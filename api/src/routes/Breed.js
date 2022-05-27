const express = require("express");
const router = express.Router();
const {
  getBreeds,
  getByBreedId,
  createBreed,
  orderBreed,
} = require("../controllers/Breed.controller");

// Configuracion del router
router.get("/", getBreeds);
router.get("/:id", getByBreedId);
router.post("/order", orderBreed);
router.post("/create", createBreed);

module.exports = router;
