import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ProtectedRoute from './ProtectedRoute';

import App from '../components/App';
import Login from '../components/login/Login';
import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <ProtectedRoute exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
