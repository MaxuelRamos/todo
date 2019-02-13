import { ADD_PROJECT, DELETE_PROJECT } from '../constants/projectsConstants';

export function addProject(payload) {
  return { type: ADD_PROJECT, payload };
}

export function deleteProject(payload) {
  console.log('deletando');
  return { type: DELETE_PROJECT, payload };
}
