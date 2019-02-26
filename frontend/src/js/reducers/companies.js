// import uuid from 'uuid';
import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILED,
} from '../constants/companiesConstants';

const initialState = {
  companies: [],
  loading: false,
};

function companies(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
    case FETCH_COMPANIES_FAILED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default companies;
