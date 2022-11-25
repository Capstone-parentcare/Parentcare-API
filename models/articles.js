'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Doctors",
        key: "id",
      },
    },
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Article;
};