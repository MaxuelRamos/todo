const User = require('../models/User');

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

  /** Disable user */
  async disable(req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user.enabled) {
          res.json(user.id);
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

  /** Enable user */
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
