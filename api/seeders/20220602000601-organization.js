"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "organizations",
      [
        {
          name: "Sida",
          abbreviation: "SD",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
        {
          name: "UD",
          abbreviation: "UD",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
        {
          name: "Folke Bernadotte Academy",
          abbreviation: "FBA",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
        {
          name: "Svenska institutet",
          abbreviation: "SI",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        },
        {
          name: "Foundation ICCO",
          abbreviation: "FICCO",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
          deletedAt: null,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("organizations", null, {});
  },
};
