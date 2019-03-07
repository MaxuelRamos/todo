import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: null,
  loginFailure: ['error'],
  authenticatedRequest: null,
  authenticatedSuccess: ['user'],
  authenticatedFailure: ['error'],
  logout: null,
});
/* #endregion */

/* #region Handlers */
const INITIAL_STATE = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('id_token'),
};

/* #region Login */
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
/* #endregion */

/* #region Authenticated User */
const authenticatedRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const authenticatedSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  authenticatedUser: action.user,
});

const authenticatedFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
});
/* #endregion */

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

  [Types.AUTHENTICATED_REQUEST]: authenticatedRequest,
  [Types.AUTHENTICATED_SUCCESS]: authenticatedSuccess,
  [Types.AUTHENTICATED_FAILURE]: authenticatedFailure,

  [Types.LOGOUT]: logout,
});
