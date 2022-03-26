const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    const list = await Temperament.findAll({
      attributes: ["temperament"],
    });
    const allTemperaments = list.map((element) => {
      const temp =
        element.temperament !== null ? element.temperament.split(",") : [];
      return temp;
    });
    const types = allTemperaments.flat();

    const result = types.filter((item, index) => {
      return types.indexOf(item.trim()) === index;
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getTemperaments,
};
