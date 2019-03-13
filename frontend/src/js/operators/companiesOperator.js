import { Creators as AuthActions } from '../ducks/companies';
import { jsonFetch } from '../utils/http';

export default function loadCompanies() {
  return (dispatch) => {
    dispatch(AuthActions.companiesRequest());

    return jsonFetch('/api/companies')
      .then((json) => {
        dispatch(AuthActions.companiesSuccess(json));
      })
      .catch((error) => {
        dispatch(AuthActions.companiesFailure(error));
      });
  };
}
