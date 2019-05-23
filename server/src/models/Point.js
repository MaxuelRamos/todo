const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');
const User = require('./User');

const Point = sequelize.define(
  'point',
  {
    timestamp: {
      type: Sequelize.DATE,
      notNull: true,
    },
    lat: {
      type: Sequelize.STRING,
      notNull: true,
      max: 50,
    },
    long: {
      type: Sequelize.STRING,
      notNull: true,
      max: 50,
    },
    imgPath: {
      type: Sequelize.STRING,
      notNull: true,
      max: 50,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    comment: {
      type: Sequelize.STRING,
      notNull: false,
      max: 200,
    },
  },
  {
    schema: 'ponto',
  },
);
Point.belongsTo(User);

module.exports = Point;
