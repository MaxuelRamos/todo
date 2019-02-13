const uuid = require("uuid");

const testes = [
  {
    name: "asd",
    id: uuid()
  }
];

module.exports = {
  async index(req, res) {
    return res.json(testes);
  },

  async store(req, res) {
    req.body.id = uuid();
    testes.push(req.body);

    return res.json(req.body);
  }
};
