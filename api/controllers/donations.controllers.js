const express = require("express");
const moment = require("moment");
const router = express.Router();
const models = require("../models");
const Op = models.Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    let { dateStart, dateEnd, countries, pageSize, page } = req.query;
    let where = {};
    let whereCountry = {};

    if (pageSize > 50) {
      pageSize = 50; // Max
    }

    page = page? page < 1 ? 1 : page : 1;

    let offset = page * pageSize || 0;
    pageSize = pageSize || 10;

    if (dateStart && dateEnd) {
      where = {
        date: {
          [Op.and]: {
            [Op.lte]: new Date(
              moment(new Date(`${dateStart} 00:00:00`))
                .add(1, "years")
                .format()
            ),
            [Op.gte]: new Date(`${dateEnd} 00:00:00`),
          },
        },
      };
    }

    if (countries) {
      whereCountry.abbreviation = { [Op.in]: countries.split(",") };
    }

    let optionsDonations = {
      attributes: ["id", "value", "date"],
      include: [
        {
          model: models.currency,
          as: "currency",
          attributes: ["name", "abbreviation"],
        },
        {
          model: models.organizations,
          as: "organization",
          attributes: ["name", "abbreviation"],
        },
        {
          model: models.country,
          as: "country",
          where: whereCountry,
          attributes: ["name", "abbreviation"],
        },
      ],
      order: [["date", "DESC"]],
      where: where,
      offset,
      limit: pageSize,
      // logging: process.env.NODE_ENV === "production" ? null : console.log, // Solo para entornos diferentes
    };

    const Donations = await models.donations.findAndCountAll(optionsDonations);

    // Result
    return res.json({
      data: Donations.rows,
      meta: {
        pageSize: parseInt(pageSize),
        page: parseInt(page),
        total: Donations.count,
        count: Donations.rows.length,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: error.message, stack: error });
  }
});

module.exports = router;
