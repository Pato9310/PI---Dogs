const { Temperament } = require("../db");

// Obtengo todos los temperamentos de las razas
const getTemperaments = async (req, res) => {
  try {
    // Obtengo el array de razas de la DB
    const list = await Temperament.findAll({
      atributes: ["temperament"],
    });
    // Creo un arreglo de temperamentos, ya que en la base se almacena como un string
    // const allTemperaments = list.map((element) => {
    //   const temp =
    //     element.temperament !== null ? element.temperament.split(",") : [];
    //   return temp;
    // });
    // // Aplano el array para que sea un unico nivel
    // const types = list.flat();
    const types = list.map((el) => el.temperament).flat();
    // Elimino elementos repetidos
    const result = types.filter((item, index) => {
      return types.indexOf(item) === index;
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getTemperaments,
};
