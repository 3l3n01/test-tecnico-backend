"use strict";
module.exports = (sequelize, DataTypes) => {
  const currency = sequelize.define(
    "currency",
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

  return currency;
};
