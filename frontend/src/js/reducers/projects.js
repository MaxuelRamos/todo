// import uuid from 'uuid';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
} from '../constants/projectsConstants';

const initialState = {
  projects: [
    // {
    //   name: 'teste 1',
    //   id: uuid(),
    // },
    // {
    //   name: ' teste 2',
    //   id: uuid(),
    // },
  ],
  loading: false,
};

function projects(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    case FETCH_PROJECTS_REQUEST:
    case FETCH_PROJECTS_FAILED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PROJECTS_SUCCESS:
      console.log(action);
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default projects;
