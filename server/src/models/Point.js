const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

const Point = sequelize.define(
  'point',
  {
    timestamp: {
      type: Sequelize.DATE,
      notNull: true,
    },
  },
  {
    schema: 'ponto',
  },
);

module.exports = Point;
