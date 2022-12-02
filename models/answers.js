'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Answers has one Question and One Doctor through QuestionId and DoctorId with alias doctor and question
      Answers.belongsTo(models.Questions, {foreignKey: 'question_id', as: 'question'});
      Answers.belongsTo(models.Doctors, {foreignKey: 'doctor_id', as: 'doctor'});
    }
  }
  Answers.init({
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Doctors",
        key: "id",
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Questions",
        key: "id",
      },
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Answers',
  });
  return Answers;
};