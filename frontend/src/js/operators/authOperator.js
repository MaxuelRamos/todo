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
        dispatch(AuthActions.authenticatedSuccess(json));
      })
      .catch((error) => {
        localStorage.removeItem('id_token');
        dispatch(AuthActions.logout());
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
