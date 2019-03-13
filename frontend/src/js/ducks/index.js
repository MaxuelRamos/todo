import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import companies from './companies';

export default combineReducers({
  auth,
  companies,
  routing: routerReducer,
});
