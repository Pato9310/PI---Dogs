const { Breed, Temperament } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const getBreeds = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      const allBreeds = await Breed.findAll({
        include: Temperament,
      });
      return res.send(allBreeds);
    }
    const list = await Breed.findAll({
      include: Temperament,
      where: {
        name: {
          [Op.substring]: `${query}`,
        },
      },
    });
    list.length > 0
      ? res.send(list.map((dog) => dog.name))
      : res.status(404).send({ message: "Breed does not found" });
  } catch (e) {
    console.log(e);
  }
};

const getByBreedId = async (req, res) => {
  const { idRaza } = req.params;
  if (idRaza) {
    try {
      const dog = await Breed.findByPk({
        include: { model: Temperament, where: { id: idRaza } },
      });
      return res.status(200).send(dog);
    } catch (err) {
      res.status(400).send({ message: "Should enter a valid ID" });
    }
  }
  res.status(400).send({ message: "Should enter an ID" });
};

const createBreed = async (req, res) => {
  const { name, height, weight, life_span, image, temperament } = req.body;
  try {
    const id = uuidv4().toString().toUpperCase();
    const newBreed = await Breed.findOrCreate({
      where: { name: name },
      defaults: {
        id,
        name,
        image,
        weight,
        height,
        life_span,
      },
    });
    const newTemperament = await Temperament.create({
      id,
      temperament,
    });
    await newBreed.addTemperament(newTemperament);
    res.send({ message: "Dog created successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBreeds,
  getByBreedId,
  createBreed,
};
