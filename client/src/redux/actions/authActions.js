import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {setAlert} from '../actions/alertActions';

/**
 * @description Load user by token
 */
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({
  name,
  email,
  password,
  history
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/api/users', body, config);

    history.push('/');
  } catch (err) {
    const {errors} = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

/**
 * @description Login User
 */

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const {errors} = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT});
};
