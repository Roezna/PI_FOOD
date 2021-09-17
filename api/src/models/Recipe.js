const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define('recipe', {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type : DataTypes.STRING,
        allowNull: false
      },
      resume: {
        type : DataTypes.TEXT,
        allowNull: false
      },
      reputation: {
        type : DataTypes.FLOAT
      },
      level_health: {
        type : DataTypes.FLOAT
      },
      steps: {
        type : DataTypes.TEXT
      },
      diets:{
        type: DataTypes.STRING
      }

  });
  const Type_diet = sequelize.define('type_diet', {
    id: {
      primaryKey: true,
      type: DataTypes.CHAR
    },
    name:{
      type: DataTypes.STRING
    }
  });

};
