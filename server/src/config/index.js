const env = process.env.NODE_ENV || 'dev';

const dev = require('./dev');
const test = require('./test');
const prod = require('./prod');

const config = { dev, test, prod };

module.exports = config[env.trim()];
