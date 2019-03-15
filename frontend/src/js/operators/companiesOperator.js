import { push } from 'react-router-redux';
import { Creators as CompanyActions } from '../ducks/companies';
import {
  jsonFetch, jsonPost, jsonPut, jsonDelete,
} from '../utils/http';

const api = '/api/companies';

export function loadCompanies() {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());

    return jsonFetch(api)
      .then((json) => {
        dispatch(CompanyActions.loadCompaniesSuccess(json));
      })
      .catch((error) => {
        dispatch(CompanyActions.companyFailure(error));
      });
  };
}

export function loadCompany(id) {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());

    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(CompanyActions.loadCompanySuccess(json));
      })
      .catch((error) => {
        dispatch(CompanyActions.companyFailure(error));
      });
  };
}

export function editCompany(id) {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());
    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(CompanyActions.loadCompanyForEditionSuccess(json));
        dispatch(push(`/companies/edit/${id}`));
      })
      .catch((error) => {
        dispatch(CompanyActions.companyFailure(error));
      });
  };
}

export function createCompany(company) {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());

    return jsonPost(`${api}`, company)
      .then((json) => {
        dispatch(CompanyActions.createCompanySuccess(json));
        dispatch(push(`/companies/${json.id}`));
      })
      .catch(error => dispatch(CompanyActions.companyFailure(error.message)));
  };
}

export function updateCompany(company) {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());

    return jsonPut(`${api}/${company.id}`, company)
      .then((json) => {
        dispatch(CompanyActions.updateCompanySuccess(json));
        dispatch(push(`/companies/${json.id}`));
      })
      .catch(error => dispatch(CompanyActions.companyFailure(error.message)));
  };
}

export function disableCompany(id) {
  return (dispatch) => {
    dispatch(CompanyActions.companyRequest());

    return jsonDelete(`${api}/${id}`)
      .then((json) => {
        dispatch(CompanyActions.disableCompanySuccess(json));
        dispatch(push('/companies'));
      })
      .catch(error => dispatch(CompanyActions.companyFailure(error.message)));
  };
}
