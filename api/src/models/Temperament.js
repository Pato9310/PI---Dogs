const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Temperament", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4,
    },
    temperament: {
      type: DataTypes.STRING,
    },
  });
};
