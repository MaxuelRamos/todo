const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

const User = sequelize.define('user', {
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
    max: 10,
  },
});

module.exports = User;
