const uuid = require('uuid');
const db = require('../db/db');

module.exports = {
  // List All
  async index(req, res) {
    return res.json(db.get('projects').value());
  },

  // Create
  async store(req, res) {
    const proj = req.body;
    proj.id = uuid();

    db.get('projects')
      .push(proj)
      .write();

    return res.json(proj);
  },

  // Find One
  async findOne(req, res) {
    res.json(
      db
        .get('projects')
        .find({ id: req.body })
        .value(),
    );
  },

  // Update
  async update(req, res) {
    const proj = req.body;

    db.get('projects')
      .find({ id: proj.id })
      .assign(proj)
      .write();

    res.json(proj);
  },

  // Delete
  async delete(req, res) {
    db.get('projects')
      .remove({ id: req.body })
      .write();

    return res.json(req.body);
  },
};
