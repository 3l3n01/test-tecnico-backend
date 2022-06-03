"use strict";
module.exports = (sequelize, DataTypes) => {
  const organizations = sequelize.define(
    "organizations",
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

  organizations.associate = function (models) {
    organizations.hasMany(models.donations, {
      as: "donations",
      foreignKey: {
        name: "organizationId",
        allowNull: true,
      },
    });
  };

  return organizations;
};
