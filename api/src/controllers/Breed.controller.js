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
      return res.send(
        allBreeds.map((breed) => {
          let obj = {
            id: breed.id,
            image: breed.image,
            name: breed.name,
            min__height: breed.min__height,
            max__height: breed.max__height,
            min__weight: breed.min__weight,
            max__weight: breed.max__weight,
            life__span: breed.life__span,
            temperament: breed.Temperaments[0]?.temperament,
          };
          return obj;
        })
      );
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
      ? res.send(
          list.map((breed) => {
            let obj = {
              id: breed.id,
              image: breed.image,
              name: breed.name,
              min__height: breed.min__height,
              max__height: breed.max__height,
              min__weight: breed.min__weight,
              max__weight: breed.max__weight,
              life__span: breed.life__span,
              temperament: breed.Temperaments[0]?.temperament,
            };
            return obj;
          })
        )
      : res.status(404).send({ message: "Breed does not found" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// Obtengo un raza especifica de acuerdo al ID de la misma
const getByBreedId = async (req, res) => {
  const { id } = req.params;
  if (id.length) {
    try {
      const dog = await Breed.findOne({
        include: Temperament,
        where: { id: id },
      });
      return dog
        ? res.status(200).send(dog)
        : res.status(404).send({ message: "Should enter a valid ID" });
    } catch (err) {
      return res.send({ message: "Something goes wrong with your id request" });
    }
  }
  return res.status(404).send({ message: "Should enter an ID" });
};

// Crea una nueva raza segun los datos ingresados en el form del front
const createBreed = async (req, res) => {
  const {
    name,
    min__height,
    max__height,
    min__weight,
    max__weight,
    life__span,
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
      life__span,
    });
    const newTemperament = await Temperament.create({
      id,
      temperament,
    });
    await newBreed.addTemperament(newTemperament);
    return res.status(200).send({ message: "Dog created successfully" });
  } catch (err) {
    return res.status(404).send({ message: error.message });
  }
};

// Ordena las razas segun los atributos seleccionados en el front
const orderBreed = async (req, res) => {
  try {
    // Obtengo los valores de los atributos enviados por body
    const { column, direction } = req.query;
    let allBreeds = await Breed.findAll({
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
    return res.status(200).send(
      allBreeds.map((breed) => {
        let obj = {
          id: breed.id,
          image: breed.image,
          name: breed.name,
          min__height: breed.min__height,
          max__height: breed.max__height,
          min__weight: breed.min__weight,
          max__weight: breed.max__weight,
          life__span: breed.life__span,
          temperament: breed.Temperaments[0]?.temperament,
        };
        return obj;
      })
    );
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getBreeds,
  getByBreedId,
  createBreed,
  orderBreed,
};
