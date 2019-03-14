const Company = require('../models/Company');

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
    const {
      name, cnpj, userCount, expiration,
    } = req.body;

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

        company.name = name;
        company.cnpj = cnpj;
        company.userCount = userCount;
        company.expiration = expiration;

        company
          .update()
          .then((comp) => {
            res.json(comp);
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },

  /** Delete */
  async delete(req, res) {
    Company.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((company) => {
        company.enabled = false;

        company
          .update()
          .then(() => {
            res.status(200).send();
          })
          .catch(error => onError(error, res));
      })
      .catch(error => onError(error, res));
  },
};
