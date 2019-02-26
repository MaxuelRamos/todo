const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

mongoose.connect('mongodb+srv://dev:191126022@cluster0-srt37.mongodb.net/dev?retryWrites=true', {
  useNewUrlParser: true,
}); // test

app.use(express.json());

app.use(require('./routes'));

// Serve any static files
app.use(express.static(path.join(__dirname, '../../frontend/build')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, host, () => console.log(`Listening on port ${port}!!!!!`));
