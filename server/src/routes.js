const express = require('express');

const routes = express.Router();

const jwtMiddleware = require('./middlewares/jwtMiddleware');
const is = require('./middlewares/roleMiddleware');

const authController = require('./controllers/AuthController');
const companiesController = require('./controllers/CompaniesController');

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

routes.put(
  '/api/companies/:id/user/:userId',
  is('ADMIN'),
  companiesController.disableUser,
);

/** Users */

module.exports = routes;
