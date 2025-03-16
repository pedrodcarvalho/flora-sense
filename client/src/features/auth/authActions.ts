import { loginUser, logout } from './authSlice';
import { AppDispatch } from '../../store/store';

export const userLogin =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(loginUser({ username, password }));
  };

export const userLogout = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
