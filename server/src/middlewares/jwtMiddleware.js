const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const jwtMiddleware = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({ message: 'Failed to authenticate token.' });
      }

      User.findOne(
        {
          _id: decoded.id,
        },
        (loadErr, user) => {
          if (loadErr) {
            return res.status(500).send(loadErr);
          }

          req.user = user;
          return next();
        },
      );
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

module.exports = jwtMiddleware;
