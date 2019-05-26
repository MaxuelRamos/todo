const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();

const key = fs.readFileSync(`${__dirname}/certs/selfsigned.key`);
const cert = fs.readFileSync(`${__dirname}/certs/selfsigned.crt`);

console.log(process.env.DATABASE_NAME);

const options = {
  key,
  cert,
};

// configuring the AWS environment
AWS.config.update({
  accessKeyId: 'AKIAJQODCLSBZ7CNPDXA',
  secretAccessKey: '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',
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
if (process.env.NODE_ENV === 'dev ') {
  app.use(morgan('dev'));
}
// Serve any static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

https
  .createServer(options, app)
  .listen(5000, () => console.log(`Listening on port ${5000}!!!!!`));

module.exports = app;
