import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import companies from './companies';
import users from './users';

export default combineReducers({
  auth,
  companies,
  users,
  routing: routerReducer,
});
