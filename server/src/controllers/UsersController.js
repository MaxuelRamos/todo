const User = require('../models/User');
const Point = require('../models/Point');
const Company = require('../models/Company');

const onError = (error, res) => {
  console.log(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

module.exports = {
  async index(req, res) {
    User.findAll({
      where: {
        companyId: req.query.companyId,
      },
      order: ['email'],
    })
      .then((companies) => {
        res.json(companies);
      })
      .catch(error => onError(error, res));
  },

  async findOne(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  async store(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  async update(req, res) {
    const newData = req.body;

    User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Company, attributes: ['id'] }],
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
          return;
        }

        user.email = newData.email;

        user
          .save()
          .then((usr) => {
            res.json(usr);
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },

  async disable(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user.enabled) {
          res.json(user.id);
          return;
        }

        user.enabled = false;

        user
          .save()
          .then(() => {
            res.json(user.id);
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },

  async enable(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (user.enabled) {
          res.json(user.id);
        }

        user.enabled = true;

        user
          .save()
          .then(() => {
            res.json(user.id);
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },
};
