import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
} from '../constants/projectsConstants';

import { jsonFetch } from '../utils/http';

// export function addProject(payload) {
//   return { type: ADD_PROJECT, payload };
// }

// export function deleteProject(payload) {
//   console.log('deletando');
//   return { type: DELETE_PROJECT, payload };
// }

const fetchingProjects = () => ({ type: FETCH_PROJECTS_REQUEST });
const fetchSucceeded = payload => ({ type: FETCH_PROJECTS_SUCCESS, payload });
const fetchFailed = error => ({ type: FETCH_PROJECTS_FAILED, error });

export default function fetchProjects() {
  return (dispatch) => {
    dispatch(fetchingProjects());

    return jsonFetch('/api/projects')
      .then(json => dispatch(fetchSucceeded(json)))
      .catch((error) => {
        // const message = `Failed to load projects list. ${error.message}`;
        // dispatch(displayError(message));
        dispatch(fetchFailed(error));
      });
  };
}
