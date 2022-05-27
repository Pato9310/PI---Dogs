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
    list.length
      ? res.send(list)
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
        where: { id },
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
  const { body } = req;
  try {
    const id = uuidv4().toString().toUpperCase();
    // Insertando la nueva raza en la db
    const newBreed = await Breed.findOrCreate({
      where: {
        name: body.name.toLowerCase()
      },
      defaults: {
        id,
        name: body.name.toLowerCase(),
        image: body.image,
        min__weight: body.min__weight,
        max__weight: body.max__weight,
        min__height: body.min__height,
        max__height: body.max__height,
        life__span: body.life__span,
        dbBreed: true,
      }
    });

    // Relacionando los temperamentos con la nueva raza
    body?.temperament?.map(async(t) => {
      const temp = await Temperament.findOne({
        where: {
          temperament: t.toLowerCase()
        }
      });
      await newBreed[0].addTemperament(temp.id)
    })

    return res.status(200).send({ message: "Dog created successfully" });
  } catch (err) {
    return res.status(404).send({ message: error.message });
  }
};

// Ordena las razas segun los atributos seleccionados en el front
const orderBreed = async (req, res) => {
  try {
    // Obtengo los valores de los atributos enviados por body
    const { body } = req;
    const payload = Object.entries(body);

    if (!payload) return res.status(404).send({ message: 'Body Not Found'});

    const attributes = payload.map((p) => [p[0],p[1]]);
    let allBreeds = await Breed.findAll({
      include: Temperament,
      order: attributes
    });
    return res.status(200).send(allBreeds);
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
