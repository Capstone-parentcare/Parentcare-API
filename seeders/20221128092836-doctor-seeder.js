'use strict';

const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const username = 'Gancar';
    const email = 'gancar6@gmail.com';
    const password = '12345678';

    const convertPassword = md5(password);

    await queryInterface.bulkInsert('Doctors', [{
      id: 1,
      "username": username,
      "email": email,
      "password": convertPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
