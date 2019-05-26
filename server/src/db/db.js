const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
  {
    logging: true,
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '-03:00', // for writing to database
  },
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
