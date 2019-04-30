const Point = require('../../src/models/Point');
const User = require('../../src/models/User');
const Company = require('../../src/models/Company');

const clean = async () => {
  await Company.sync({ force: true });
  await User.sync({ force: true });
  await Point.sync({ force: true });
};

module.exports = clean;
