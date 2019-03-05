import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import reducers from './js/reducers';
import Routes from './js/routes';

import history from './js/routes/history';

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

const middlewares = [thunkMiddleware, routerMiddleware(history), logger];

// Cria o store do redux à partir dos reducers, plugando os middlewares do projeto
const store = createStore(
  reducers(history),
  composeEnhancers(applyMiddleware(...middlewares)),
);
/* #endregion */

/* #region Render */
ReactDOM.render(
  <Provider store={store}>
    <Routes />
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
