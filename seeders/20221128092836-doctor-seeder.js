'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const username = 'Gancar';
    const email = 'gancar6@gmail.com';
    const password = '12345678';

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    await queryInterface.bulkInsert('Doctors', [{
      id: 1,
      "username": username,
      "email": email,
      "password": hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
