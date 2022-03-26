const { Router } = require("express");
const breedRouter = require("./Breed.js");
const temperamentRouter = require("./Temperament.js");

const router = Router();

// Configuracion de routers
router.use("/breeds", breedRouter);
router.use("/temperaments", temperamentRouter);

module.exports = router;
