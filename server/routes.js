const express = require('express');
const routes = express.Router();

const projectsController = require('./controllers/projectsController');

routes.get('/api/projects', projectsController.index);
routes.post('/api/projects', projectsController.store);

module.exports = routes;