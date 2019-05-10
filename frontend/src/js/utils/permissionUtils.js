import store from '../store/store';

const userIs = (role) => {
  const user = store.getState().auth.authenticatedUser;
  return user && user.role === role;
};

export default userIs;
