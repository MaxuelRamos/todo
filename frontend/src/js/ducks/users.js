import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  userRequest: null,
  userFailure: ['error'],
});
/* #endregion */

/* #region Initial State */
const INITIAL_STATE = {
  loading: false,
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

export default createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: userRequest,
  [Types.USER_FAILURE]: userFailure,
});
