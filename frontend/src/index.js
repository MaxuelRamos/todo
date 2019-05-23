import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router, Route, browserHistory, IndexRedirect,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import * as serviceWorker from './serviceWorker';
import Login from './js/views/login/Login';
import Main from './js/views/Main';
import Me from './js/views/users/Me';
import CompaniesList from './js/views/companies/CompaniesList';
import UsersList from './js/views/users/UsersList';
import CompaniesViewer from './js/views/companies/CompanyViewer';
import CompanyForm from './js/views/companies/CompanyForm';
import UserForm from './js/views/users/UserForm';
import PointForm from './js/views/point/PointForm';
import store from './js/store/store';
import 'moment/locale/pt-br';

const history = syncHistoryWithStore(browserHistory, store);

const checkAuth = (nextState, replace) => {
  if (!store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// moment.locale('pt-BR');

/* #region Render */
ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      locale="pt-br"
      libInstance={moment}
    >
      <Router history={history}>
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} onEnter={checkAuth}>
          <IndexRedirect to="me" />
          <Route path="me" component={Me} />
          <Route path="me/register" component={PointForm} />
          <Route path="users" component={UsersList} />
          <Route path="companies" component={CompaniesList} />
          <Route path="companies/:id" component={CompaniesViewer} />
          <Route path="companies/edit/:id" component={CompanyForm} />
          <Route path="users/edit/:id" component={UserForm} />
          <Route path="users/edit/:id" component={UserForm} />
        </Route>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root'),
);
/* #endregion */

/* #region Service worker */
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
/* #endregion */
