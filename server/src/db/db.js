const Sequelize = require('sequelize');
const env = require('../config/index');

const sequelize = new Sequelize(env.db, { logging: false });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
