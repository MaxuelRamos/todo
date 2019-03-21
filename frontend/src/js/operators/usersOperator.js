import { push } from 'react-router-redux';
import { Creators as UserActions } from '../ducks/users';
import { jsonFetch, jsonPost, jsonPut } from '../utils/http';

const api = '/api/users';

export function loadUsers(company) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonFetch(`${api}/?companyId=${company.id}`)
      .then((json) => {
        dispatch(UserActions.loadUsersSuccess(json));
      })
      .catch((error) => {
        dispatch(UserActions.userFailure(error));
      });
  };
}

export function loadUser(id) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(UserActions.loadUserSuccess(json));
      })
      .catch((error) => {
        dispatch(UserActions.userFailure(error));
      });
  };
}

export function editUser(id) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());
    return jsonFetch(`${api}/${id}`)
      .then((json) => {
        dispatch(UserActions.loadUserSuccess(json));
        dispatch(push(`/users/edit/${id}`));
      })
      .catch((error) => {
        dispatch(UserActions.userFailure(error));
      });
  };
}

export function createUser(user) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonPost(`${api}`, user)
      .then((json) => {
        dispatch(UserActions.createUserSuccess(json));
        dispatch(push(`/companies/${json.companyId}`));
      })
      .catch(error => dispatch(UserActions.userFailure(error.message)));
  };
}

export function updateUser(user) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonPut(`${api}/${user.id}`, user)
      .then((json) => {
        dispatch(UserActions.updateUserSuccess(json));
        dispatch(push(`/companies/${json.company.id}`));
      })
      .catch(error => dispatch(UserActions.userFailure(error.message)));
  };
}

export function disableUser(user) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonPut(`${api}/${user.id}/disable`)
      .then((json) => {
        dispatch(UserActions.disableUserSuccess(json));
      })
      .catch(error => dispatch(UserActions.userFailure(error.message)));
  };
}

export function enableUser(user) {
  return (dispatch) => {
    dispatch(UserActions.userRequest());

    return jsonPut(`${api}/${user.id}/enable`)
      .then((json) => {
        dispatch(UserActions.enableUserSuccess(json));
      })
      .catch(error => dispatch(UserActions.userFailure(error.message)));
  };
}
