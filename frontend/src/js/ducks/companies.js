import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  companiesRequest: null,
  companiesSuccess: ['companies'],
  companiesFailure: ['error'],
});
/* #endregion */

/* #region Handlers */
const INITIAL_STATE = {
  loading: false,
  companies: [],
};

/* #region Login */
const companiesRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
});

const companiesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  companies: action.companies,
});

const companiesFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
  companies: [],
});
/* #endregion */

export default createReducer(INITIAL_STATE, {
  [Types.COMPANIES_REQUEST]: companiesRequest,
  [Types.COMPANIES_SUCCESS]: companiesSuccess,
  [Types.COMPANIES_FAILURE]: companiesFailure,
});
