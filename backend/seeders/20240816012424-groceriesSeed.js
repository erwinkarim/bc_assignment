'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // randomly generate 10 items
    let groceryItems = [...Array(20).keys()].map((e) => { 
      return {
        id: parseInt(Math.random()*100000),
        createdAt: new Date(),
        updatedAt: new Date(),
        brand: faker.company.name(),
        name: faker.commerce.productName(),
        upc12: parseInt(Math.random()*100000000000),
      };
     });
     console.log('groceryItems', groceryItems);

    await queryInterface.bulkInsert('groceries', groceryItems, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('groceries', null, {});
  }
};
