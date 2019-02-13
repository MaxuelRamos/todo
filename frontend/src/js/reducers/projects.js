import uuid from 'uuid';
import { ADD_PROJECT, DELETE_PROJECT } from '../constants/projectsConstants';

const initialState = {
  projects: [
    {
      name: 'teste 1',
      id: uuid(),
    },
    {
      name: ' teste 2',
      id: uuid(),
    },
  ],
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
    default:
      return state;
  }
}

export default projects;
