const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // defino el modelo
  const Recipe = sequelize.define('recipe', {
      id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        
      },
      title: {
        type : DataTypes.STRING,
        allowNull: false
      },
      summary: {
        type : DataTypes.TEXT,
        allowNull: false
      },
      spoonacularScore: {
        type : DataTypes.INTEGER
      },
      healthScore: {
        type : DataTypes.INTEGER
      },
      steps: {
        type : DataTypes.ARRAY(DataTypes.STRING)
      },
      diets: {
        type : DataTypes.ARRAY(DataTypes.STRING)
      },
      image : {
        type: DataTypes.STRING
      }

  });
  const Type_diet = sequelize.define('type_diet', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull : true
    },
    name:{
      type: DataTypes.STRING
    }
  });

};
