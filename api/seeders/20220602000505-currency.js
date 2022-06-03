"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "currencies",
      [
        {
          name: "Dolar",
          abbreviation: "USD",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("currency", null, {});
  },
};
