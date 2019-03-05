import { push } from 'connected-react-router';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants/authConstants';

import { jsonPut } from '../utils/http';

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
    // history.push('/login');
  };
}
