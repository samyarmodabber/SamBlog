import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
// import articleReducer from './articleReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
//   articles: articleReducer
});
