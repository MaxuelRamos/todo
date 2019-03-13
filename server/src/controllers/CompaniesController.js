const Company = require('../models/Company');

module.exports = {
  /** Get */
  async index(req, res) {
    const companies = await Company.findAll({
      where: {
        enabled: true,
      },
      order: ['name'],
    });
    return res.json(companies);
  },

  /** Get by id */
  async findOne(req, res) {
    const company = await Company.findOne({
      id: req.id,
    });

    res.json(company);
  },

  /** Create */
  async store(req, res) {
    try {
      await Company.create(req.body);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  },

  /** Update */
  async update(req, res) {
    const {
      name, cnpj, userCount, expiration,
    } = req.body;

    const company = await Company.findOne({
      id: req.id,
    });

    if (!company) res.status(404).send({ message: 'Company not found' });

    company.name = name;
    company.cnpj = cnpj;
    company.userCount = userCount;
    company.expiration = expiration;

    try {
      await company.save();
      res.status(200).send();
    } catch (e) {
      res.status(500).send(e);
    }
  },

  /** Delete */
  async delete(req, res) {
    const company = await Company.findOne({
      id: req.id,
    });

    company.enabled = false;

    company.save();

    res.status(200).send();
  },
};
