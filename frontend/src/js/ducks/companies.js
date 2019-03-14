import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  companyRequest: null,
  companyFailure: ['error'],

  loadCompaniesSuccess: ['companies'],
  loadCompanySuccess: ['company'],
  createCompanySuccess: ['company'],
  loadCompanyForEditionSuccess: ['company'],
});
/* #endregion */

/* #region Initial State */
const INITIAL_STATE = {
  loading: false,
  companies: [],
};
/* #endregion */

/* Generic handlers */
const companyRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true,
  selected: undefined,
  companies: [],
});

const companyFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
  selected: undefined,
  companies: [],
});

/* Companies list */
const loadCompaniesSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  companies: action.companies,
});

/* Company load */
const loadCompanySuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.company,
});

/* Company load for edition */
const loadCompanyForEditionSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.company,
});

/* Company creation */
const createCompanySuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.company,
});
/* #endregion */

export default createReducer(INITIAL_STATE, {
  [Types.COMPANY_REQUEST]: companyRequest,
  [Types.COMPANY_FAILURE]: companyFailure,

  [Types.LOAD_COMPANIES_SUCCESS]: loadCompaniesSuccess,
  [Types.LOAD_COMPANY_SUCCESS]: loadCompanySuccess,
  [Types.CREATE_COMPANY_SUCCESS]: createCompanySuccess,
  [Types.LOAD_COMPANY_FOR_EDITION_SUCCESS]: loadCompanyForEditionSuccess,
});
