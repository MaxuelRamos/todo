import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import companies from './companies';
import points from './points';
import users from './users';

export default combineReducers({
  auth,
  companies,
  users,
  points,
  routing: routerReducer,
});
