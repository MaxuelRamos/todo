import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import companies from './companies';
import auth from './auth';

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  companies,
});
