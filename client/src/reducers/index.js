import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

// combines and exports reducers
export default combineReducers({
  alert,
  auth,
  profile
});
