'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('groceries', { 
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,  }, 
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      brand: Sequelize.STRING,
      name: Sequelize.STRING,
      upc12: Sequelize.BIGINT,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('groceries');
  }
};
