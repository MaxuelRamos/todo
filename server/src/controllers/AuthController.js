const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('../config');

module.exports = {
  // Create
  async store(req, res) {
    // create a sample user
    const support = new User({
      email: 'suporte@ponto.com',
      password: 'ponto@suporte',
      role: 'ADMIN',
    });
    // save the sample user
    support.save((err) => {
      if (err) throw err;

      res.json({ success: true });
    });
  },

  async authenticate(req, res) {
    // find the user
    const user = await User.findOne({
      email: req.body.username,
    });

    if (!user) {
      res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          id: user._id,
        };
        const token = jwt.sign(payload, config.secret);

        // return the information including token as JSON
        res.json({
          token,
        });
      }
    }
  },

  async authenticated(req, res) {
    res.json(req.user);
  },
};
