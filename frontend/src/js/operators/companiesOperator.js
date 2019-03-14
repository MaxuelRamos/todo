import { push } from 'react-router-redux';
import { Creators as AuthActions } from '../ducks/companies';
import { jsonFetch } from '../utils/http';

const api = '/api/companies';

export function loadCompanies() {
  return (dispatch) => {
    dispatch(AuthActions.companyRequest());

    return jsonFetch(api)
      .then((json) => {
        dispatch(AuthActions.loadCompaniesSuccess(json));
      })
      .catch((error) => {
        dispatch(AuthActions.companyFailure(error));
      });
  };
}

export function loadCompany(id) {
  return (dispatch) => {
    dispatch(AuthActions.companyRequest());

    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(AuthActions.loadCompanySuccess(json));
      })
      .catch((error) => {
        dispatch(AuthActions.companyFailure(error));
      });
  };
}

export function editCompany(id) {
  return (dispatch) => {
    dispatch(AuthActions.companyRequest());
    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(AuthActions.loadCompanyForEditionSuccess(json));
        push(`/companies/edit/${id}`);
      })
      .catch((error) => {
        dispatch(AuthActions.companyFailure(error));
      });
  };
}
