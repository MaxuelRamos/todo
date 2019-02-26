import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILED,
} from '../constants/companiesConstants';

import { jsonFetch } from '../utils/http';

const fetchingCompanies = () => ({ type: FETCH_COMPANIES_REQUEST });
const fetchcompaniesSucceeded = payload => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload,
});
const fetchCompaniesFailed = error => ({ type: FETCH_COMPANIES_FAILED, error });

export default function fetchCompanies() {
  return (dispatch) => {
    dispatch(fetchingCompanies());

    return jsonFetch('/api/companies')
      .then(json => dispatch(fetchcompaniesSucceeded(json)))
      .catch((error) => {
        // const message = `Failed to load projects list. ${error.message}`;
        // dispatch(displayError(message));
        dispatch(fetchCompaniesFailed(error));
      });
  };
}
