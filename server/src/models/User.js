const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

const Company = require('./Company');

const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      notNull: true,
      isEmail: true,
      max: 50,
    },
    password: {
      type: Sequelize.STRING,
      notNull: true,
      max: 200,
    },
    role: {
      type: Sequelize.STRING,
      notNull: true,
      defaultValue: 'USER',
      max: 10,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    schema: 'ponto',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
);

User.belongsTo(Company);

module.exports = User;
