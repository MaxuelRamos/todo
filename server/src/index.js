const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const config = require('./config'); // get our config file

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

// mongoose.connect(config.database, {
//   useNewUrlParser: true,
// }); // test); // connect to database
// app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(require('./routes'));

// Serve any static files
app.use(express.static(path.join(__dirname, '../../frontend/build')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, host, () => console.log(`Listening on port ${port}!!!!!`));
