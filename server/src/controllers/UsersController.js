const bcrypt = require('bcrypt');
const User = require('../models/User');
const Point = require('../models/Point');
const Company = require('../models/Company');

const defaultPassword = bcrypt.hashSync('123456', 10);

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

  async findEmployers(req, res) {
    User.findAll({
      where: {
        role: 'EMPLOYER',
      },
      order: ['email'],
    })
      .then((users) => {
        res.json(users);
      })
      .catch(error => onError(error, res));
  },

  async findOne(req, res) {
    const where = { id: req.params.id };

    if (req.user.role === 'USER' && Number(req.params.id) !== req.user.id) {
      res.status(403).send();
    }
    if (req.user.role === 'EMPLOYER') {
      where.companyId = req.user.companyId;
    }

    User.findOne({
      where,
      attributes: { include: ['companyId'] },
    })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  async store(req, res) {
    const { email, role, companyId } = req.body;

    if (req.user.role === 'USER' && Number(req.params.id) !== req.user.id) {
      res.status(403).send();
      return;
    }
    if (req.user.role === 'EMPLOYER' && companyId !== req.user.companyId) {
      res.status(403).send();
      return;
    }

    const newUser = { email, companyId, password: defaultPassword };

    if (req.user.role === 'ADMIN') {
      newUser.role = role;
      newUser.companyId = companyId;
    } else if (req.user.companyId !== companyId) {
      res.status(403).send();
    }

    User.create(newUser)
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
