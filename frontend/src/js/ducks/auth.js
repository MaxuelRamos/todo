import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: null,
  loginFailure: ['error'],
  logout: null,
});
/* #endregion */

/* #region Handlers */
const INITIAL_STATE = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('id_token'),
};

const loginRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
  isAuthenticated: false,
});

const loginSuccess = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  isAuthenticated: true,
  errorMessage: '',
});

const loginFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  isAuthenticated: false,
  errorMessage: action.error,
});

const logout = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  isAuthenticated: false,
});

/* #endregion */

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
