const express = require('express');

const routes = express.Router();

const companiesController = require('./controllers/companiesController');

// List All
routes.get('/api/companies', companiesController.index);

// Create
routes.post('/api/companies', companiesController.store);

// Get by id
routes.get('/api/companies/:id', companiesController.findOne);

// Update
routes.put('/api/companies/:id', companiesController.update);

// Delete
routes.delete('/api/companies/:id', companiesController.delete);

module.exports = routes;
