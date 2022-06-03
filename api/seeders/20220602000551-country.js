"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          name: "Sudán",
          abbreviation: "SD",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
        {
          name: "Iraq",
          abbreviation: "IQ",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
