const { Temperament } = require("../db");

// Obtengo todos los temperamentos de las razas
const getTemperaments = async (req, res) => {
  try {
    // Obtengo el array de razas de la DB
    const list = await Temperament.findAll({
      atributes: ["temperament"],
    });
    const types = list.map((el) => el.temperament).flat();
    // Elimino elementos repetidos
    const result = types.filter((item, index) => {
      return types.indexOf(item) === index;
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getTemperaments,
};
