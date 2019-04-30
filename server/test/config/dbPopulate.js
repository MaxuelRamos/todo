const bcrypt = require('bcrypt');
const User = require('../../src/models/User');
const Company = require('../../src/models/Company');

const clean = async () => {
  const company = await Company.create({
    name: 'teste',
    cnpj: '123456',
    userCount: 1,
    enabled: true,
  });

  await User.create({
    name: 'admin',
    role: 'ADMIN',
    companyId: company.id,
    email: 'admin@ponto.com',
    password: bcrypt.hashSync('123456', 10),
  });

  await User.create({
    name: 'user',
    role: 'USER',
    companyId: company.id,
    email: 'user@ponto.com',
    password: bcrypt.hashSync('123456', 10),
  });
};

module.exports = clean;
