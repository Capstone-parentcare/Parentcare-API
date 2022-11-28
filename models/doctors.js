'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async authenticate(email, password) {
      const doctor = await Doctor.findOne({ where: { email } });
      if (!doctor) {
        throw new Error('Invalid email or password');
      }

      if (bcrypt.compareSync(password, doctor.password) === false) {
        throw new Error('Invalid email or password');
      }

      return doctor;
    }

    static associate(models) {
      // define association here
    }
  }
  Doctor.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctors',
  });
  return Doctor;
};