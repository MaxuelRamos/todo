const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

const Company = sequelize.define(
  'company',
  {
    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 18],
        },
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
        },
      },
    },
    userCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 1,
        max: 100,
      },
    },
    expiration: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { schema: 'ponto' },
);

// Company.hasMany(User);

module.exports = Company;
