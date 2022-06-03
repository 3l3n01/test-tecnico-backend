"use strict";
module.exports = (sequelize, DataTypes) => {
  const donations = sequelize.define(
    "donations",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      value: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { paranoid: true }
  );

  donations.associate = function (models) {
    donations.belongsTo(models.currency, {
      as: "currency",
      foreignKey: {
        name: "currencyId",
        allowNull: false,
      },
    });

    donations.belongsTo(models.organizations, {
      as: "organization",
      foreignKey: {
        name: "organizationId",
        allowNull: false,
      },
    });

    donations.belongsTo(models.country, {
      as: "country",
      foreignKey: {
        name: "countryId",
        allowNull: false,
      },
    });
  };

  return donations;
};
