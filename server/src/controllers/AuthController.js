const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../config');

const onError = (error, res) => {
  console.log(error);
  res.status(500).send({ message: 'Ocorreu um erro durante a operação' });
};

module.exports = {
  // Create
  // async store(req, res) {
  //   // create a sample user
  //   const support = new User({
  //     email: 'suporte@ponto.com',
  //     password: '$2b$10$dRPZywHBatSJ30RCSYa6AOT76fUy/UscZGRMhFYgy5T54Ld4thNRG', // ponto@suporte
  //     role: 'ADMIN',
  //   });
  //   // save the sample user
  //   support.save((err) => {
  //     if (err) throw err;

  //     res.json({ success: true });
  //   });
  // },

  async authenticate(req, res) {
    User.findOne({
      where: { email: req.body.username },
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
          const token = jwt.sign(payload, config.secret);

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
