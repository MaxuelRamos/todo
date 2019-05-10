const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

const Point = require('../models/Point');

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

User.hasMany(Point);
Point.belongsTo(User);

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  User.sync();
  Point.sync();
}

module.exports = User;
