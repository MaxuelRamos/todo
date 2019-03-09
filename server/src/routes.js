const express = require('express');

const routes = express.Router();

const jwtMiddleware = require('./middlewares/jwtMiddleware');
const is = require('./middlewares/roleMiddleware');
const authController = require('./controllers/AuthController');

// Create
// routes.get('/api/auth', authController.store);
routes.put('/api/auth', authController.authenticate);

routes.use(jwtMiddleware);

routes.get('/api/auth', authController.authenticated);

module.exports = routes;
