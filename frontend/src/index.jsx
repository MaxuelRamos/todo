import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { Router, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import Login from './js/components/login/Login';
import * as serviceWorker from './serviceWorker';
import reducers from './js/reducers';
import ProtectedRoute from './js/components/routes/ProtectedRoute';
import history from './js/history/history';

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

// Cria o store do redux à partir dos reducers, plugando os middlewares do projeto
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(logger, thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <ProtectedRoute exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
