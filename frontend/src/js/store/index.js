import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';

const isDebugging = process.env.NODE_ENV === 'development';
const loggerMiddleware = createLogger({
  predicate: () => isDebugging,
  duration: true,
  timestamp: true,
  collapsed: true,
});

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  ),
);

export default store;
