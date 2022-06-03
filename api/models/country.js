"use strict";
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define(
    "country",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      abbreviation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { paranoid: true }
  );

  country.associate = function (models) {
    country.hasMany(models.donations, {
      as: "donations",
      foreignKey: {
        name: "countryId",
        allowNull: true,
      },
    });
  };

  return country;
};
