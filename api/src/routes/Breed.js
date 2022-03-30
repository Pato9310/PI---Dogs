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
router.get("/order", orderBreed);
router.get("/:id", getByBreedId);
router.post("/create", createBreed);

module.exports = router;
