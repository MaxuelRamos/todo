const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtMiddleware = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Failed to authenticate token.' });
      }

      User.findOne({
        where: { id: decoded.id },
        attributes: { include: ['companyId'] },
      })
        .then((user) => {
          if (!user) {
            return res.status(401).send({ message: 'User not found.' });
          }

          req.user = user;
          return next();
        })
        .catch(error => res.status(500).send(error));
    });
  } else if (req.path.startsWith('/api')) {
    // if there is no token
    // return an error
    return res.status(403).send({
      message: 'No token provided.',
    });
  } else {
    next();
  }
};

module.exports = jwtMiddleware;
