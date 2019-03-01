import { push } from 'react-router-redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_AUTHENTICATED_USER_REQUEST,
  LOAD_AUTHENTICATED_USER_SUCCESS,
  LOAD_AUTHENTICATED_USER_FAILURE,
  LOGOUT,
} from '../constants/authConstants';

import { jsonFetch, jsonPut } from '../utils/http';
import { displayError } from './appActions';


const requestLogin = credentials => ({ type: LOGIN_REQUEST, credentials });
const receiveLogin = token => ({ type: LOGIN_SUCCESS, id_token: token });
const loginError = message => ({ type: LOGIN_FAILURE, message });
const logout = () => ({ type: LOGOUT });

export function loginUser(credentials) {
  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(credentials));

    return jsonPut('/api/auth', credentials)
      .then((json) => {
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', json.token);

        // Dispatch the success action
        dispatch(receiveLogin(json));
        dispatch(push('/'));
      })
      .catch(error => dispatch(loginError(error.message)));
  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('id_token');
    dispatch(logout());
    dispatch(push('/login'));
  };
}

/*
 *  GET  /api/auth
 */

const loadingAuthenticatedUser = () => ({
  type: LOAD_AUTHENTICATED_USER_REQUEST,
});
const loadAuthenticatedUserSucceeded = user => ({
  type: LOAD_AUTHENTICATED_USER_SUCCESS,
  user,
});
const loadAuthenticatedUserFailed = error => ({
  type: LOAD_AUTHENTICATED_USER_FAILURE,
  error,
});

export function loadAuthenticatedUser() {
  return (dispatch) => {
    dispatch(loadingAuthenticatedUser());
    return jsonFetch('/api/auth')
      .then(json => dispatch(loadAuthenticatedUserSucceeded(json)))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('id_token');
          dispatch(logout());
          dispatch(push('/login'));
        } else {
          const message = `Failed to load the authenticated user. ${
            error.message
          }`;
          dispatch(displayError(message));
          dispatch(loadAuthenticatedUserFailed(error));
        }
      });
  };
}
