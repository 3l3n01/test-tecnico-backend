"use strict";
const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Recuperar todas las organizaciones
    const org = await queryInterface.sequelize.query(
      `SELECT id from organizations;`
    );

    const org_l = org[0].length;

    const curr = await queryInterface.sequelize.query(
      `SELECT id from currencies;`
    );

    const coun = await queryInterface.sequelize.query(
      `SELECT id from countries;`
    );

    const coun_l = coun[0].length;

    const ins = [];

    for (let i = 0; i < 1000; i++) {
      const d = moment()
        .subtract({
          days: getRandom(1, 20),
          months: getRandom(1, 12),
          years: getRandom(0, 10),
          hours: getRandom(0, 20),
          minutes: getRandom(0, 50),
          seconds: getRandom(0, 50),
        })
        .format();

      //-> Cantidad
      const value = getRandom(500, 55555);

      ins.push({
        value,
        date: d,
        currencyId: parseInt(curr[0][0].id),
        organizationId: parseInt(org[0][getRandom(0, org_l)].id),
        countryId: parseInt(coun[0][getRandom(0, coun_l)].id),
        createdAt: Sequelize.fn("now"),
        updatedAt: Sequelize.fn("now"),
        deletedAt: null,
      });
    }
    await queryInterface.bulkInsert("donations", ins);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("donations", null, {});
  },
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
