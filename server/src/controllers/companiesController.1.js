const Company = require('../models/Company');

module.exports = {
  // List All
  async index(req, res) {
    const companies = await Company.find({}).sort('name');
    return res.json(companies);
  },

  // Create
  async store(req, res) {
    const company = await Company.create(req.body);

    return res.json(company);
  },

  // Find One
  async findOne(req, res) {},

  // Update
  async update(req, res) {},

  // Delete
  async delete(req, res) {},
};
