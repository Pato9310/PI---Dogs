const express = require("express");
const router = express.Router();
const {
  getBreeds,
  getByBreedId,
  createBreed,
} = require("../controllers/Breed.controller");

router.get("/", getBreeds);

router.get("/:idRaza", getByBreedId);

router.post("/create", createBreed);

module.exports = router;
