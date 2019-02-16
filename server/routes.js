const express = require('express');

const routes = express.Router();

const projectsController = require('./controllers/projectsController');

// List All
routes.get('/api/projects', projectsController.index);

// Create
routes.post('/api/projects', projectsController.store);

// Get by id
app.get('/api/projects/:id', projectsController.findOne);

// Update
app.put('/api/projects/:id', projectsController.update);

// Delete
app.delete('/api/projects/:id', projectsController.delete);
}

module.exports = routes;
