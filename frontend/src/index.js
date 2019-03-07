import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import * as serviceWorker from './serviceWorker';
import reducers from './js/ducks';

import Login from './js/components/login/Login';
import Main from './js/components/Main';
import Profile from './js/components/profile/Profile';
import CompaniesList from './js/components/companies/CompaniesList';

const router = routerMiddleware(browserHistory);

/* #region Debugging options */
const isDebugging = process.env.NODE_ENV === 'development';

// Configura o logger para o redux que vai apresentar as actions no console do browser
const logger = createLogger({
  predicate: () => isDebugging,
  duration: true,
  timestamp: true,
  collapsed: true,
});

// Configura a extensão do redux-devtools, se estiver disponível
// http://zalmoxisus.github.io/redux-devtools-extension/
let composeEnhancers = compose;
if (isDebugging) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/* #endregion */

/* #region Store */

// Cria o store do redux à partir dos reducers, plugando os middlewares do projeto
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, router, logger)),
);
/* #endregion */

const history = syncHistoryWithStore(browserHistory, store);

const checkAuth = (nextState, replace) => {
  if (!store.getState().auth.isAuthenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

/* #region Render */
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/" component={Main} onEnter={checkAuth}>
        <Route path="profile" component={Profile} />
        <Route path="companies" component={CompaniesList} />
      </Route>
    </Router>
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
