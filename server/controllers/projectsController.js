const uuid = require('uuid');
const db = require('../db/db');

module.exports = {
  async index(req, res) {
    return res.json(db.get('projects').value());
  },

  async store(req, res) {
    const proj = req.body;
    proj.id = uuid();

    db.get('projects')
      .push(proj)
      .write();

    return res.json(proj);
  },
};
