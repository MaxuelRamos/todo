const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

// const config = require('./config'); // get our config file

const app = express();
const port = process.env.PORT || 443;
const host = '0.0.0.0';

const key = fs.readFileSync(`${__dirname}/../certs/selfsigned.key`);
const cert = fs.readFileSync(`${__dirname}/../certs/selfsigned.crt`);

const options = {
  key,
  cert,
};

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
if (process.env.NODE_ENV === 'dev ') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Serve any static files
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(require('./routes'));
// Handle React routing, return all requests to React app

app.listen(5000, host, () => console.log(`Listening on port ${5000}!!!!!`));

module.exports = app;

// const server = https.createServer(options, app);
// server.listen(port, () => {
//   console.log(`server starting on port : ${port}`);
// });
