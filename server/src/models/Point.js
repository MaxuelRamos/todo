const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');

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
  },
  {
    schema: 'ponto',
  },
);

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  Point.sync();
}

module.exports = Point;
