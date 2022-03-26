const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Breed", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field can't be null",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min__height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max__height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min__weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max__weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
  });
};
