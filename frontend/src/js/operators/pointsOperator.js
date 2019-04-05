import { push } from 'react-router-redux';
import { Creators as PointActions } from '../ducks/points';
import { jsonPost } from '../utils/http';

const api = '/api/points';

export default function registerPoint(point) {
  return (dispatch) => {
    dispatch(PointActions.pointRequest());

    return jsonPost(`${api}`, point)
      .then((json) => {
        dispatch(PointActions.registerPointSuccess(json));
        dispatch(push('/me'));
      })
      .catch(error => dispatch(PointActions.pointFailure(error.message)));
  };
}
