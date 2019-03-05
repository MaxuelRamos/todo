import { push } from 'connected-react-router';
import { Creators as AuthActions } from '../ducks/auth';
import { jsonPut } from '../utils/http';

export function loginUser(credentials) {
  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(AuthActions.loginRequest());

    return jsonPut('/api/auth', credentials)
      .then((json) => {
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', json.token);

        // Dispatch the success action
        dispatch(AuthActions.loginSuccess());

        // redirect
        dispatch(push('/'));
      })
      .catch(error => dispatch(AuthActions.loginFailure(error.message)));
  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('id_token');
    dispatch(AuthActions.logout());
  };
}
