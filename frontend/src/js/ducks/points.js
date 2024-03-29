import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  pointRequest: null,
  pointFailure: ['error'],

  registerPointSuccess: null,
  loadPointsSuccess: ['points'],
});
/* #endregion */

/* #region Initial State */
const INITIAL_STATE = {
  loading: false,
  points: [],
};
/* #endregion */

/* Generic handlers */
const pointRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const pointFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
});

const registerPointSuccess = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  errorMessage: '',
});

const loadPointsSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  points: action.points,
});

export default createReducer(INITIAL_STATE, {
  [Types.POINT_REQUEST]: pointRequest,
  [Types.POINT_FAILURE]: pointFailure,
  [Types.REGISTER_POINT_SUCCESS]: registerPointSuccess,
  [Types.LOAD_POINTS_SUCCESS]: loadPointsSuccess,
});
