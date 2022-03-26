const { Breed, Temperament } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

// Obtengo todas las razas provenientes de la DB
const getBreeds = async (req, res) => {
  try {
    const query = req.query.q;
    // si query no existe devuelve todas las razas
    if (!query) {
      const allBreeds = await Breed.findAll({
        include: Temperament,
      });
      return res.send(allBreeds);
    }
    // caso contrario devuelve la raza del query o cualquier raza que contenga dicho query
    const list = await Breed.findAll({
      include: Temperament,
      where: {
        name: {
          [Op.substring]: `${query}`,
        },
      },
    });
    return list.length > 0
      ? res.send(list.map((dog) => dog.name))
      : res.status(404).send({ message: "Breed does not found" });
  } catch (e) {
    console.log(e);
  }
};

// Obtengo un raza especifica de acuerdo al ID de la misma
const getByBreedId = async (req, res) => {
  const { id } = req.params;
  console.log("entre en id", id);
  if (id.length) {
    try {
      const dog = await Breed.findOne({
        include: Temperament,
        where: { id: id },
      });
      return res.status(200).send(dog);
    } catch (err) {
      return res.status(400).send({ message: "Should enter a valid ID" });
    }
  }
  return res.status(400).send({ message: "Should enter an ID" });
};

// Crea una nueva raza segun los datos ingresados en el form del front
const createBreed = async (req, res) => {
  const {
    name,
    min__height,
    max__height,
    min__weight,
    max__weight,
    life_span,
    image,
    temperament,
  } = req.body;
  try {
    const id = uuidv4().toString().toUpperCase();
    const newBreed = await Breed.create({
      id,
      name,
      image,
      min__weight,
      max__weight,
      min__height,
      max__height,
      life_span,
    });
    const newTemperament = await Temperament.create({
      id,
      temperament,
    });
    await newBreed.addTemperament(newTemperament.id);
    return res.send({ message: "Dog created successfully" });
  } catch (err) {
    console.log(err);
  }
};

const filterByTemperament = async (req, res) => {
  try {
    const { filter } = req.body;
    const allBreeds = await Breed.findAll({
      include: { model: Temperament, attributes: ["temperament"] },
    });
    const filtered = allBreeds.filter(
      (breed) => console.log("aca", breed.Temperaments)
      // breed.Temperaments.temperament.filter((element) =>
      //   element.toLowerCase().includes(filter.toLowerCase())
      // )
    );
    return res.status(200).send(filtered);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const orderBreed = async (req, res) => {
  try {
    const { column, direction } = req.body;
    const allBreeds = await Breed.findAll({
      include: Temperament,
    });
    direction === "asc"
      ? allBreeds.sort((a, b) => {
          if (a[column] > b[column]) return 1;
          if (a[column] < b[column]) return -1;
          return 0;
        })
      : allBreeds.sort((a, b) => {
          if (a[column] < b[column]) return 1;
          if (a[column] > b[column]) return -1;
          return 0;
        });
    return res.status(200).send(allBreeds);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getBreeds,
  getByBreedId,
  createBreed,
  orderBreed,
  filterByTemperament,
};
