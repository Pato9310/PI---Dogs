const axios = require("axios");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { Breed, Temperament } = require("../db.js");

// Obtengo los datos provenientes de la API y los ingreso a la DB
const preChargeDb = async () => {
  // Peticion a la API
  const apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds");
  let breeds = apiResponse.data.map((breed) => {
    const height = breed.height["imperial"].split(" - ");
    const weight = breed.weight["imperial"].split(" - ");
    const temperament =
      breed.temperament !== null && breed.temperament !== undefined
        ? breed.temperament.split(",").map((el) => el.trim())
        : ["No Temperament"];
    return {
      id: uuidv4().toString().toUpperCase().substring(0, 6),
      name: breed.name,
      image: breed.image.url,
      temperament: temperament,
      min__height: parseInt(height[0])
        ? parseInt(height[0])
        : parseInt(height[1]),
      max__height: parseInt(height[1])
        ? parseInt(height[1])
        : parseInt(height[0]),
      min__weight: parseInt(weight[0])
        ? parseInt(weight[0])
        : parseInt(weight[1]),
      max__weight: parseInt(weight[1])
        ? parseInt(weight[1])
        : parseInt(weight[0]),
      life__span: breed.life_span,
    };
  });
  // Ingreso a la DB
  breeds = breeds.map(async (dog) => {
    let breedCreated = await Breed.create(dog);
    let tempCreated = await Temperament.create(dog);
    await breedCreated.addTemperament(tempCreated.id);
  });
};

module.exports = {
  preChargeDb,
};
