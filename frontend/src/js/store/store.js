import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import reducers from '../ducks';

const isDebugging = process.env.NODE_ENV === 'development';

// Configura a extensão do redux-devtools, se estiver disponível
// http://zalmoxisus.github.io/redux-devtools-extension/
let composeEnhancers = compose;
if (isDebugging) {
  // eslint-disable-next-line no-underscore-dangle
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// Configura o logger para o redux que vai apresentar as actions no console do browser
const logger = createLogger({
  predicate: () => isDebugging,
  duration: true,
  timestamp: true,
  collapsed: true,
});

const router = routerMiddleware(browserHistory);

// Cria o store do redux à partir dos reducers, plugando os middlewares do projeto
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, router, logger)),
);

export default store;
