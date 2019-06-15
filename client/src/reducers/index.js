import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
// import articleReducer from './articleReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
//   articles: articleReducer
});
