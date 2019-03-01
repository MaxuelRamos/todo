import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_AUTHENTICATED_USER_REQUEST,
  LOAD_AUTHENTICATED_USER_SUCCESS,
  LOAD_AUTHENTICATED_USER_FAILURE,
  LOGOUT,
} from '../constants/authConstants';

const initialState = {
  processing: false,
  isAuthenticated: !!localStorage.getItem('id_token'),
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        processing: true,
        isAuthenticated: false,
      });

    // Login e Logout
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        processing: false,
        isAuthenticated: true,
        errorMessage: '',
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        processing: false,
        isAuthenticated: false,
        errorMessage: action.message,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        processing: false,
        isAuthenticated: false,
      });

    // Load Authenticated user
    case LOAD_AUTHENTICATED_USER_REQUEST:
      return Object.assign({}, state, {
        processing: true,
      });
    case LOAD_AUTHENTICATED_USER_SUCCESS:
      return Object.assign({}, state, {
        authenticatedUser: action.user,
        processing: false,
      });
    case LOAD_AUTHENTICATED_USER_FAILURE:
      return Object.assign({}, state, {
        processing: false,
      });
    default:
      return state;
  }
}

export default auth;
