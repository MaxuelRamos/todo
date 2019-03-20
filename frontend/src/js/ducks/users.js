import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  userRequest: null,
  userFailure: ['error'],

  loadUserSuccess: ['user'],
  loadUsersSuccess: ['users'],
  createUserSuccess: ['user'],
  updateUserSuccess: ['user'],
  disableUserSuccess: ['userId'],
  enableUserSuccess: ['userId'],
});
/* #endregion */

/* #region Initial State */
const INITIAL_STATE = {
  loading: false,
  users: [],
};
/* #endregion */

/* Generic handlers */
const userRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const userFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
});

const loadUsersSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  users: action.users,
});

const loadUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.user,
});

const createUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.user,
});

const updateUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.user,
});

const disableUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  users: state.selected.users.map(u => (u.id === action.userId ? { ...u, enabled: false } : u)),
});

const enableUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  users: state.selected.users.map(u => (u.id === action.userId ? { ...u, enabled: true } : u)),
});

export default createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: userRequest,
  [Types.USER_FAILURE]: userFailure,

  [Types.LOAD_USERS_SUCCESS]: loadUsersSuccess,
  [Types.LOAD_USER_SUCCESS]: loadUserSuccess,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.DISABLE_USER_SUCCESS]: disableUserSuccess,
  [Types.ENABLE_USER_SUCCESS]: enableUserSuccess,
});
