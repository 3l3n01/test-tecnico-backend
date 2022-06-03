"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "donations",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.BIGINT,
        },
        value: {
          allowNull: false,
          type: Sequelize.BIGINT,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATE,
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
        },
        currencyId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "currencies",
            key: "id",
          },
        },
        organizationId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "organizations",
            key: "id",
          },
        },
        countryId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "countries",
            key: "id",
          }, 
        },
      },
      { paranoid: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("donations");
  },
};
