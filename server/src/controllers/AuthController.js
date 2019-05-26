const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const onError = (error, res) => {
  console.error(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

module.exports = {
  async authenticate(req, res) {
    User.findOne({
      where: { email: req.body.email },
      attributes: { include: ['password'] },
    })
      .then((user) => {
        if (!user) {
          res.status(401).send({
            message: 'Usuário não encontrado.',
          });

          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            onError(err, res);
            return;
          }

          if (result === false) {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. Wrong password.',
            });

            return;
          }

          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            id: user.id,
          };
          const token = jwt.sign(payload, process.env.SECRET);

          // return the information including token as JSON
          res.json({
            token,
          });
        });
      })
      .catch((error) => {
        onError(error, res);
      });
  },

  async authenticated(req, res) {
    res.json(req.user);
  },
};
