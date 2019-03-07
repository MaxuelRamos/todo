import { push } from 'react-router-redux';
import { Creators as AuthActions } from '../ducks/auth';
import { jsonPut, jsonFetch } from '../utils/http';

export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(AuthActions.loginRequest());

    return jsonPut('/api/auth', credentials)
      .then((json) => {
        localStorage.setItem('id_token', json.token);

        dispatch(AuthActions.loginSuccess());
        dispatch(push('/'));
      })
      .catch(error => dispatch(AuthActions.loginFailure(error.message)));
  };
}

export function loadAuthenticatedUser() {
  return (dispatch) => {
    dispatch(AuthActions.authenticatedRequest());

    return jsonFetch('/api/auth')
      .then((json) => {
        dispatch(AuthActions.loginSuccess(json));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('id_token');
          dispatch(AuthActions.logout());
        } else {
          dispatch(AuthActions.authenticatedFailure(error.message));
        }
      });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('id_token');
    dispatch(AuthActions.logout());
    dispatch(push('/login'));
  };
}
