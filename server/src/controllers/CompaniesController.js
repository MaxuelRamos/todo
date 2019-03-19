const Company = require('../models/Company');
const User = require('../models/User');

const onError = (error, res) => {
  console.log(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

module.exports = {
  /** Get */
  async index(req, res) {
    Company.findAll({
      where: {
        enabled: true,
      },
      order: ['name'],
    })
      .then((companies) => {
        res.json(companies);
      })
      .catch(error => onError(error, res));
  },

  /** Get by id */
  async findOne(req, res) {
    Company.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
      ],
    })
      .then((company) => {
        res.json(company);
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  /** Create */
  async store(req, res) {
    Company.create(req.body)
      .then((company) => {
        res.json(company);
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  /** Update */
  async update(req, res) {
    const newData = req.body;

    Company.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((company) => {
        if (!company) {
          res.status(404).send({ message: 'Company not found' });
          return;
        }

        company.name = newData.name;
        company.cnpj = newData.cnpj;
        company.userCount = newData.userCount;
        company.expiration = newData.expiration;

        company
          .save()
          .then((comp) => {
            res.json(comp);
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },

  /** Disable */
  async disable(req, res) {
    Company.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((company) => {
        company.enabled = false;

        company
          .save()
          .then(() => {
            res.status(200).send();
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },

  /** Disable user */
  async disableUser(req, res) {
    User.findOne({
      where: {
        id: req.params.userId,
      },
    })
      .then((user) => {
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
};
