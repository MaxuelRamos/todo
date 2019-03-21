const express = require('express');

const routes = express.Router();

const jwtMiddleware = require('./middlewares/jwtMiddleware');
const is = require('./middlewares/roleMiddleware');

const authController = require('./controllers/AuthController');
const companiesController = require('./controllers/CompaniesController');
const usersController = require('./controllers/UsersController');

/** Authentication */
routes.put('/api/auth', authController.authenticate);

/** Token validation */
routes.use(jwtMiddleware);

/** Authenticated */
routes.get('/api/auth', authController.authenticated);

/** Companies */
routes.get('/api/companies', is('ADMIN'), companiesController.index);
routes.get('/api/companies/:id', is('ADMIN'), companiesController.findOne);
routes.post('/api/companies/', is('ADMIN'), companiesController.store);
routes.put('/api/companies/:id', is('ADMIN'), companiesController.update);
routes.delete('/api/companies/:id', is('ADMIN'), companiesController.disable);

routes.get('/api/users', is('ADMIN'), usersController.index);
routes.get('/api/users/:id', is('ADMIN'), usersController.findOne);
routes.post('/api/users/', is('ADMIN'), usersController.store);
routes.put('/api/users/:id', is('ADMIN'), usersController.update);
routes.put('/api/users/:id/disable', is('ADMIN'), usersController.disable);
routes.put('/api/users/:id/enable', is('ADMIN'), usersController.enable);

/** Users */

module.exports = routes;
