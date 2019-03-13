const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://ponto:ponto@admin@localhost:5432/ponto',
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
