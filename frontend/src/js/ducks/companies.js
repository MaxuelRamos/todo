import { createActions, createReducer } from 'reduxsauce';

/* #region Action types & creators */
export const { Types, Creators } = createActions({
  companyRequest: null,
  companyFailure: ['error'],

  loadCompaniesSuccess: ['companies'],
  loadCompanySuccess: ['company'],
  loadCompanyForEditionSuccess: ['company'],
  createCompanySuccess: ['company'],
  updateCompanySuccess: ['company'],
  disableCompanySuccess: null,
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
});

const companyFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: action.error,
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

/* Company update */
const updateCompanySuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: action.company,
});

const disableCompanySuccess = (state = INITIAL_STATE) => ({
  ...state,
  loading: false,
  errorMessage: '',
  selected: undefined,
});

export default createReducer(INITIAL_STATE, {
  [Types.COMPANY_REQUEST]: companyRequest,
  [Types.COMPANY_FAILURE]: companyFailure,

  [Types.LOAD_COMPANIES_SUCCESS]: loadCompaniesSuccess,
  [Types.LOAD_COMPANY_SUCCESS]: loadCompanySuccess,
  [Types.LOAD_COMPANY_FOR_EDITION_SUCCESS]: loadCompanyForEditionSuccess,
  [Types.CREATE_COMPANY_SUCCESS]: createCompanySuccess,
  [Types.UPDATE_COMPANY_SUCCESS]: updateCompanySuccess,
  [Types.DISABLE_COMPANY_SUCCESS]: disableCompanySuccess,
});
