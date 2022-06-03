'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('organizations', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      abbreviation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    { paranoid: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('organizations');
  }
};
