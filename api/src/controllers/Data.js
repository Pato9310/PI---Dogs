const axios = require("axios");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { Breed, Temperament } = require("../db.js");

const preChargeDb = async () => {
  axios.defaults.headers.common["x-api-key"] = API_KEY;
  const apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds");
  let breeds = apiResponse.data.map((breed) => {
    return {
      id: uuidv4().toString().toUpperCase().substring(0, 6),
      name: breed.name,
      image: breed.image.url,
      temperament: breed.temperament,
      height: breed.height["metric"],
      weight: breed.weight["metric"],
      life_span: breed.life_span,
    };
  });
  breeds = breeds.map(async (dog) => {
    let breedCreated = await Breed.create(dog);
    let tempCreated = await Temperament.create(dog);
    await breedCreated.addTemperament(tempCreated.id);
  });
};

module.exports = {
  preChargeDb,
};
